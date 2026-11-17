# Screenshot boundary diagnostic · November 17, 2026, 16:00 UTC

This isolated diagnostic is not acceptance, a repair, or a content release. Do not merge it as one. Main and Wallet candidate source are not changed by its branch.

## Hypothesis and controls

Pinned Playwright 1.57.0 direct-page screenshot API steps end before subsequent client file writes. Test whether the full unchanged screenshot await has a material residual beyond the matching API step. That residual includes setup, scheduling, timing granularity and reporting boundaries, not merely filesystem IO.

On one Ubuntu 24.04 host, build exact Wallet `012ce7acb7b438653acf679323d7fc8e1f824c49` once. Run N/I/I/N, four exact GR00T reading/search cases per cohort (desktop and mobile), no warmups or retries. N is the unmodified test source. I adds monotonic timestamps around the same four original direct screenshot statements; selected cases execute three per viewport. Buffered numeric samples are written in an afterEach hook, outside the measured interval. No browser method wrappers, private Playwright patches, CDP replacements or extra reporters are introduced.

The original screenshot calls, arguments, paths, assertions, pages, viewport/device/DPR, trace retain-on-failure, reporter, one worker, zero retries, 45-second test deadline and 420-second global deadline remain intact. Diagnostic selection does not constitute root and `/timeline` full acceptance. Surrounding timing and afterEach writes themselves can perturb the process. N/I controls quantify only this bounded experiment; they cannot prove long-suite repair.

## Fail-closed mechanics

The exact original test SHA-256 is pinned. The transformation is deterministic and reverse-verified. Original source is restored in finally even on failure; all tracked-source integrity and 52 relevant file hashes are checked before and after each cohort. Inventory must contain exactly the four intended cases, each passing once. Stop immediately on a failed process, global error, missing observation or unexpected identity; no selective rerun. Original reporter step records are accumulated across periodic snapshots and final testEnd rows. Correlation uses unique project/file/line/column identity and matching worker/result duration plus strictly nonoverlapping serial begin/end events, never assumes Playwright JSON IDs equal observer hashes.

Six original PNGs per cohort must exist. After all measured processes, the separate offline decoder checks dimensions, hashes of decoded RGBA pixels and difference bounds against N1, including N2 drift. A mismatch is retained explicitly and does not become false equivalence; no image is edited or replaced. This is machine equivalence evidence, not actual human pixel review.

## Evidence and interpretation

Numerical and complete screenshot artifacts are retained separately for seven days, including raw reports and manifests on failures. No credentials, screenshots or raw traces are uploaded to Library by this workflow. A material residual would motivate deeper write-phase profiling only after controls and fidelity checks. A small residual would argue against client write as the dominant interval in these selected cases, not exclude every operation in the long suite. Do not infer pure encoding, rendering or filesystem time from coarse reporter durations.

No full CI replay, timeout/worker change, deployment, PR or local Chromium retry is authorized by this experiment. The complete original root and `/timeline` desktop/mobile suite, actual visual review, non-force main, exact CI/Pages and live verification remain the publication gate.
