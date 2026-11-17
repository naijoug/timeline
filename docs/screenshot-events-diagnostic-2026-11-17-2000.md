# Screenshot passive-event diagnostic · November 17, 2026 20:00 UTC

## Scope

This branch is diagnostic-only, not a repair, content release, or acceptance result. It follows the reviewed event-only Stage 1 design. The source is pinned to Wallet 012ce7acb7b438653acf679323d7fc8e1f824c49, built once on one runner. Fixed N/E/E/N selects only the original GR00T search-return/history case in desktop and mobile: eight observations and eight original screenshots. Stop on the first process/inventory failure; no selective rerun.

N source is unchanged. E inserts a pre-navigation passive per-document event collector and brackets the original search-return screenshot with Node monotonic timestamps. It drains the current document after that unchanged screenshot resolves, before the next original card click. Output is written afterEach, not inside screenshot timing. Every original statement and assertion is preserved by a pinned, reversible transformation. All protected source hashes are checked before and after each cohort; restoration occurs in finally even on failure.

## Collector and limitations

The collector records genuine pointer/mouse/touch coordinates and types, focus in/out, and transition events on the exact all-events link. Only that link's class/aria-current/text mutations are retained. Element identities are restricted to all-events-link, expected-card, or other; unrelated text/form values are not logged. A bounded 512-record ring counts dropped records. Unknown new-document pointer position remains null. There is no storage, console/binding bridge, layout/style/getAnimations query, frame sampling, additional screenshot or pre-capture protocol state read.

A bootstrap DOM observer disconnects once the target is discovered; a target observer then records its mutations. If the target is replaced, post-capture targetStillCurrent/targetConnected exposes that limitation. Do not infer replacement-node history from the old ring. Event listeners and mutation observation have overhead. Mutation callback time is not the exact assignment or paint time. Class is-active is distinct from CSS :active and hover.

Each sample contains Node timeOrigin/monotonic screenshot and read brackets plus browser timeOrigin/now and document identity. Clocks must not be directly equated; read-bracket uncertainty must be retained. No exact raster timestamp is claimed. Current-document records only survive to the immediate post-screenshot drain; departing-document events are intentionally not bridged.

Post-capture target text/class/aria-current and focused identity are labeled post-capture, not capture-time. Richer computed-state and hover/focus pseudo-class probing is a separate conditional Stage 2, not performed here.

## Preserved gates

Original device, viewport, DPR, assertion, screenshot options/path/format, reporter, trace retain-on-failure, worker 1, retry 0, 45-second test and 420-second global deadlines are retained. No pointer movement, focus/blur, tap substitution, CSS/reduced-motion change, animation finishing, sleep, settling poll, timeout change, private Playwright hook or CDP capture replacement is introduced. Denied local Chromium/socket/localhost actions are not retried. The workflow uses supported GitHub runner installation and read-only checkout credentials, and cannot publish Pages.

Offline pixel decoding checks all eight original PNGs, dimensions and decoded RGBA without hiding control drift or unequal images. Pixel equality is not actual human visual acceptance. All observations and screenshots are retained, with numeric evidence separately downloadable.

No full CI rerun or release is justified merely by diagnostic success. Full original root and /timeline desktop/mobile testing and actual visual review still precede non-force main, exact CI/Pages/live verification. No root cause is established by this code or its local contract tests.
