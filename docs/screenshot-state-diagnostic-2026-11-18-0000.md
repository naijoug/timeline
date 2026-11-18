# Screenshot bounded-state diagnostic · November 18, 2026 00:00 UTC

## Scope and justification

This is an unexecuted diagnostic implementation, not a fix, content release or acceptance result. Prior Stage 1 run 44167069331 directly observed all-events class empty → is-active and color transition events overlapping mobile screenshot awaits. Its unequal image contained 3,999 label pixels and 70 separate return-button rounded-edge pixels. That provides a concrete discriminator for one bounded pre/post state probe; generic screenshot variation alone would not justify more measurement.

Exact Wallet source is 012ce7acb7b438653acf679323d7fc8e1f824c49. Header.tsx:123 defines the mobile return anchor `.mobile-app-back`. navigation.css:32 hides it outside the mobile layout; lines 55–56 give it a 44×44 box, 10px border radius and a hover background. paper.css:163–165 adds 0.16-second background/border/color transitions under no-preference motion. Explorer.tsx:186 gives the all-events link is-active/aria-current when no reading lines are selected; collections.css changes its color. This source evidence does not establish the return button was hovered at the previous raster instant, or explain the ±1 edge differences.

## Fixed experiment

One exact build and one runner, N/P/P/N. Only the two original GR00T search/return/two-history-cycle cases, desktop and mobile: eight cases and eight original screenshots. N source is unchanged. P installs passive bounded per-document event listeners before navigation, then performs exactly one pre-capture state RPC and one post-capture state RPC around the unchanged raw screenshot statement. No extra capture or changed screenshot arguments. Post read drains the event ring before the next original card click; pre read does not drain it. File output occurs afterEach.

The probe records all-events and mobile-return-anchor text/class/aria fields, distinct hover/focus/focus-visible/active booleans, connected/current status, rendered status, geometry, computed color/background/border/font-weight/transition settings, bounded target animations and computed timing. Desktop may contain a hidden mobile anchor; rendered=false is not a visible-button observation. Snapshot also includes bounded active-element identity, scroll, visual viewport, DPR, hover/pointer/reduced-motion media states and font status. No unrelated DOM text, form values or storage contents are logged.

Passive pointer/focus/target mutation events retain per-document timeOrigin and document identity. Return-button transition events are additionally identified separately from all-events transitions. The 512-record ring reports drops; animation details are bounded to 16 per target with total count retained. Unknown last genuine pointer remains null; last event is not guaranteed present cursor state. Synthetic events retain isTrusted and must not be treated as genuine input. Initial target replacement is exposed, not silently interpreted as continuous history.

## Intrusion and timing boundaries

The pre read is deliberately intrusive: computed styles, rectangles and animation enumeration can force layout, cost a protocol round trip, and allow the 160 ms transition to complete. A difference disappearing only in P may therefore be an observer effect, not a fix or refutation. Do not pool E and P timings, select only matching images, rerun to get a preferred result, or claim this probe is neutral.

Both pre and post reads carry Node send/receive brackets and browser readStart/now. Browser/Node monotonic clocks have different origins. Align each read with an uncertainty interval, not assumed symmetric latency; preserve bounds and check overlap rather than assigning exact raster time. Element fields are sequential reads within that interval, not an atomic state snapshot. The raw screenshot await is only an operation interval, not its compositor/raster timestamp. One sampled hover state does not prove hover was constant throughout capture.

## Preserved gates and stop conditions

Keep every original assertion, screenshot argument/path/format, device/viewport/DPR, trace retain-on-failure, reporter, worker 1, retry 0, 45-second test and 420-second global deadlines. No pointer movement, hover/tap replacement, focus/blur, CSS injection, reduced-motion change, animation finish/cancel, sleep, settling poll, private Playwright hook, CDP capture replacement or application change. No denied local-browser/socket/localhost retry.

Pinned reversible instrumentation and source hashes protect the fixture, lockfile, original config, reporters and browser tests. Source restoration occurs in finally. Inventory, process, observer or sample failure stops the experiment without rerun. Pre/post document mismatch is an error. All PNGs, failures, event records and pixel differences remain preserved. Numerical and complete CI artifacts are separate; decoded pixel comparison is not full human visual acceptance.

This implementation has pure contracts only until a separately reviewed CI run occurs. Success would not repair the complete-suite timeout or authorize a full rerun/release. Complete original root and /timeline desktop/mobile testing and actual visual review remain required before non-force main, exact CI/Pages and live verification.
