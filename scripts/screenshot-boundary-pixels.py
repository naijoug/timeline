"""Offline equivalence evidence only. Never changes captures or acceptance."""
import hashlib, json, sys
from pathlib import Path
from PIL import Image, ImageChops

RUNS = ['01-N1', '02-I1', '03-I2', '04-N2']
NAMES = ['nvidia-groot2-research-light.png', 'nvidia-groot2-research-dark.png', 'nvidia-groot2-research-search-return.png']

def index(root):
    found = {}
    paths = sorted(root.rglob('*.png'))
    if len(paths) != 6:
        raise ValueError(f'Expected all six original PNGs, got {len(paths)}')
    for path in paths:
        projects = [p for p in ['desktop', 'mobile'] if path.parent.name.endswith('-' + p)]
        if len(projects) != 1 or path.name not in NAMES:
            raise ValueError('Unexpected screenshot identity')
        key = projects[0] + '/' + path.name
        if key in found:
            raise ValueError('Duplicate screenshot')
        with Image.open(path) as im:
            im.load()
            if im.format != 'PNG':
                raise ValueError('Not PNG')
            rgba = im.convert('RGBA')
            found[key] = {'path': path, 'image': rgba, 'dimensions': list(im.size),
                          'mode': im.mode, 'pngSha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                          'rgbaSha256': hashlib.sha256(rgba.tobytes()).hexdigest()}
    expected = {p + '/' + n for p in ['desktop', 'mobile'] for n in NAMES}
    if set(found) != expected:
        raise ValueError('Incomplete image identities')
    return found

def compare(root):
    cohorts = {r: index(root / r / 'artifacts') for r in RUNS}
    comparisons = []
    # Every cohort against the first uninstrumented control, plus N/N drift.
    for run in RUNS[1:]:
        for key, base in cohorts[RUNS[0]].items():
            item = cohorts[run][key]
            same_size = base['dimensions'] == item['dimensions']
            row = {'baseline': RUNS[0], 'run': run, 'key': key, 'sameDimensions': same_size,
                   'sameDecodedRgba': same_size and base['rgbaSha256'] == item['rgbaSha256']}
            if same_size:
                bands = ImageChops.difference(base['image'], item['image']).split()
                boxes = [b.getbbox() for b in bands if b.getbbox() is not None]
                row['differenceBoundingBox'] = [min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)] if boxes else None
                row['differentChannelValues'] = sum(sum(b.histogram()[1:]) for b in bands)
            comparisons.append(row)
    details = {r: {k: {n: v for n, v in x.items() if n not in ['path', 'image']} for k, x in items.items()} for r, items in cohorts.items()}
    result = {'purpose': 'Offline pixel equivalence, not human visual acceptance', 'cohorts': details,
              'comparisons': comparisons, 'allDimensionsEqual': all(x['sameDimensions'] for x in comparisons),
              'allDecodedPixelsEqual': all(x['sameDecodedRgba'] for x in comparisons),
              'interpretation': 'Any mismatch makes pixel equivalence unproven. Do not hide natural control drift or call this acceptance.'}
    (root / 'pixel-comparison.json').write_text(json.dumps(result, indent=2) + '\n')
    return result

if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Usage: screenshot-boundary-pixels.py EVIDENCE')
    result = compare(Path(sys.argv[1]))
    print(json.dumps({k: result[k] for k in ['allDimensionsEqual', 'allDecodedPixelsEqual']}))
