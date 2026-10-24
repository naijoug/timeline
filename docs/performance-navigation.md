# Topic navigation performance

Verified against published base `949ce229ea7af85bcf15665e126fec2e256e7191` (2026-10-24). No topic content was removed or changed.

## Cause and changes

Home already used native links. The main avoidable cost was on the destination:

- AI imported the full research dataset into its browser entry, created a 667,859-byte core catalog and a 121,886-byte presentation, and adapted all 273 events twice. About 487 KB of that catalog consisted of details, facts, significance, change notes and limitations used only by record pages.
- Other topic islands serialized their complete detail catalogs into an HTML attribute ahead of the readable timeline.
- Year grouping repeatedly scanned all results for each year.

The shared timeline now consumes a typed, build-time read index. It retains every event, full summary, search terms, entity names, source IDs, period metadata and record/model-alias destination. Full evidence and long-form content remain on existing static detail pages. AI URL compatibility is a small data-free adapter.

The compact index is a safely escaped, non-executable JSON script AFTER the rendered timeline, inside the same Astro island. Small island props and standard Astro/React hydration are retained. The island waits for its trailing children; React reuses the server-rendered links rather than replacing them. No additional data request is required. Topic links opt into Astro's hover/focus prefetch; there is no eager download of all four topics and no SPA navigation interception. Year grouping is now one pass.

## Reproducible production artifact measurements

Bytes below are generated UTF-8 artifacts. Gzip values use Node `gzipSync` default level 6 separately for each asset; they are a reproducible transfer estimate, not a claim about the site's exact HTTP compression or device latency. The home-to-topic comparison counts HTML plus JavaScript not already used by the homepage, assuming the homepage assets are cached. CSS/font sizes are unchanged apart from the small prefetch helper.

| Topic | HTML before → after | Extra JS after Home before → after | HTML + extra JS gzip before → after |
| --- | ---: | ---: | ---: |
| AI | 213,414 → 358,377 | 217,462 → 20,125 | 100,487 → 63,903 |
| Programming languages | 200,096 → 132,114 | 19,576 → 20,125 | 39,284 → 29,230 |
| Chinese history | 164,422 → 100,172 | 19,576 → 20,125 | 34,273 → 25,223 |
| Writers | 237,527 → 128,710 | 19,576 → 20,125 | 59,752 → 32,974 |

AI moves a small index from executable JS into the document, so its HTML alone grows. Total route cost falls: incremental AI JS is 90.7% smaller and estimated Home→AI compressed transfer is 36.4% smaller. The other three routes' estimated compressed transfer falls 25.6%, 26.4% and 44.8%. AI's complete cold JS dependency closure falls from 459,589 to 264,961 bytes. The remaining React runtime is shared with the homepage and every topic.

These are payload and dependency-graph measurements, not an asserted percentage reduction in elapsed load time. Live browser navigation/layout remains a separate check; simulated DOM timings are not device benchmarks.

## Regression checks

- 98 unit/regression tests: complete full-vs-index search/filter/order equivalence, JSON round trips, AI legacy URL parsing/serialization, script escaping, existing reading/navigation/content/font/appearance tests.
- `npm run check`: no errors, warnings or hints.
- Root and `/timeline/` builds: 796 pages; 20,062 internal links checked in each.
- `npm run check:reading`: default SSR event order, latest AI, all four topic links and Home→Timeline→Record structure.
- `npm run check:performance`: production dependency closure, no full AI/legacy Timeline bundle in topic entries, bounded compact payload, visible SSR cards before data, small props and hydration boundary.
- `npm run test:hydration`: actual production React/component chunks run against production SSR HTML in JSDOM. Checks SSR node reuse with no hydration errors, filters, ordering, every event in all-event mode, exact detail return context, repeated popstate, filtered AI legacy queries and specialized AI/dynasty/battle routes. This does not emulate layout, touch hardware or iOS Safari.

The new checks run in the Pages build before upload. For another base path, set `TIMELINE_BASE_PATH` and `TIMELINE_OUT_DIR` consistently for build and all artifact checks.

New content still uses the existing full `Catalog` interface. `createExplorerPayload` automatically projects new events into the read index. New topics also register their server-only catalog and presentation in `src/core/topic-payloads.server.ts`; do not import a full catalog into the client wrapper.
