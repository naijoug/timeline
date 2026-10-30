# Recycler research verification — 2026-10-25

One non-milestone research-method event; not a foundation-model, API or open-weight launch. No new entity. The existing Seed and Transformer objects provide the context. Baseline catalog: 278 events; after this addition: 279 events, 91 entities, 253 sources.

## Primary evidence

- [Seed publication](https://seed.bytedance.com/en/public_papers/recycler-cost-free-latent-reasoning-via-hidden-state-recycling): the page date is `2026-10-25`; the abstract and Download PDF link were readable during the 16:00 UTC pass.
- [Official linked paper](https://lf3-static.bytednsdoc.com/obj/eden-cn/hyvsmeh7uhobf/recycler_arxiv%20(2).pdf): 18 pages, credited to ByteDance Seed. Page 1 dates it October 25, 2026. Only day precision is established, not a post-12:00 publication timestamp.

## Claim boundaries

- Mechanism: paper §2.1 and §2.2.1, pp.2–3. The previous token's top-layer state reaches the next token through an adapter; decoding does not add backbone forward passes per generated token.
- Prefill is separate: §2.2.3, p.4 distinguishes one-pass and two-pass operation.
- Training is not cost-free: §2.3.1, p.5 states: “The training cost of Recycler is 2× that of the standard model.” The following paragraph discusses a limited extra-pass remedy and its additional cost. The timeline does not generalize these numbers to all training recipes or deployment costs.
- Availability: readable research paper is verified; code, downloadable weights and a production API are **not verified**. This is not a claim that they do not exist.
- No benchmark score or broad superiority claim is copied into the event. No experiment was run or independently reproduced.

## Retrieval limitations

The research agent successfully read the official page, dated research index and PDF text. A separate parent-agent open of the same permalink failed as inaccessible. One paper screenshot request (page 1, zero-based page 0) returned cache miss. Text extraction succeeded; no table was used as evidence. Accessibility is therefore observation-specific, not a blanket live-link guarantee.

## Verification

Focused tests: `ai-recycler-research`, `ai-recent-updates`, `ai-releases` — 13 passed. `npm run validate` passed all four catalogs. `npm run report:ai` regenerated the inventory. Full suite/build and publication are owned by the parent task; not claimed here.
