import importlib.util
from pathlib import Path
import tempfile
import unittest
from PIL import Image

source = Path(__file__).resolve().parent.parent / 'scripts' / 'screenshot-state-pixels.py'
spec = importlib.util.spec_from_file_location('pixels', source)
pixels = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pixels)

class PixelContracts(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        for run in pixels.RUNS:
            for project in ['desktop', 'mobile']:
                out = self.root / run / 'artifacts' / ('test-' + project)
                out.mkdir(parents=True)
                for name in pixels.NAMES:
                    Image.new('RGBA', (3, 4), (255, 0, 0, 255)).save(out / name)
        self.target = self.root / pixels.RUNS[1] / 'artifacts' / 'test-mobile' / pixels.NAMES[0]

    def tearDown(self):
        self.tmp.cleanup()

    def test_identical_pixels(self):
        result = pixels.compare(self.root)
        self.assertTrue(result['allDimensionsEqual'])
        self.assertTrue(result['allDecodedPixelsEqual'])
        self.assertEqual(len(result['comparisons']), 6)

    def test_rgb_difference_with_unchanged_alpha(self):
        with Image.open(self.target) as im:
            changed = im.convert('RGBA')
            changed.putpixel((1, 2), (0, 0, 0, 255))
            changed.save(self.target)
        result = pixels.compare(self.root)
        mismatches = [r for r in result['comparisons'] if not r['sameDecodedRgba']]
        self.assertEqual(len(mismatches), 1)
        self.assertEqual(mismatches[0]['differenceBoundingBox'], [1, 2, 2, 3])
        self.assertEqual(mismatches[0]['differentChannelValues'], 1)
        self.assertTrue(result['allDimensionsEqual'])
        self.assertFalse(result['allDecodedPixelsEqual'])

    def test_dimensions(self):
        Image.new('RGBA', (4, 4), (255, 0, 0, 255)).save(self.target)
        self.assertFalse(pixels.compare(self.root)['allDimensionsEqual'])

    def test_missing_or_extra_capture_fails(self):
        self.target.unlink()
        with self.assertRaises(ValueError):
            pixels.compare(self.root)

if __name__ == '__main__':
    unittest.main()
