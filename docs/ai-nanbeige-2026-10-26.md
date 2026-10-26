# Nanbeige4.3-33B — bounded weights record

Checked 2026-10-26, nominal 04:00 UTC radar. This is one 72-hour gap-fill, not a claim of a new October 26 model release. No other AI event is added by this batch.

## Primary evidence

- [Official commit history](https://huggingface.co/Nanbeige/Nanbeige4.3-33B/commits/main) places initial commit at October 24 02:49 and upload `0dacc64` at October 24 11:57. Display timezone was not established: retain day precision. October 25 entries update configuration and README; the latter ends at `c1093c5`.
- [Upload commit](https://huggingface.co/Nanbeige/Nanbeige4.3-33B/commit/0dacc64718ab6a5a7cbfc74cacc663d6c5c3de05) adds configuration, 14 safetensor shards, their index and tokenizer files. The event explicitly uses repository upload date, not a reconstructed private-to-public transition.
- [Current files](https://huggingface.co/Nanbeige/Nanbeige4.3-33B/tree/main) list 66.3 GB. The [first-shard page](https://huggingface.co/Nanbeige/Nanbeige4.3-33B/blob/main/model-00001-of-00014.safetensors) displays a download link, 4.05 GB file and SHA256 `a70e695f1a8c9686158e791829e603833840e7a8ce7ece884eff6aeca561f9b2`. This is metadata evidence, not a completed download or runtime check.
- [Model card](https://huggingface.co/Nanbeige/Nanbeige4.3-33B) supplies Apache-2.0, 33B/BF16, 524,288-token context, teacher-agent framing and vendor evaluations. Its table is not an independent ranking. No performance superlative or score is copied into the event. HF's Inference Providers panel is a snapshot, not proof that no provider exists anywhere.
- [Official organization card](https://huggingface.co/Nanbeige) identifies Nanbeige / 南北阁 as the LLM research team at BOSS Zhipin. Added one family and the explicit Chinese-team filter entry; no invented predecessor relation.
- [Maintainer discussion #6](https://huggingface.co/Nanbeige/Nanbeige4.3-33B/discussions/6) says the series report will accompany the upcoming 3B student. Neither is recorded as released.

## Scope and verification

Added one event, one model family and six source records. Totals: 280 AI events, 92 objects, 259 sources. Existing Kimi and Recycler entries remain unchanged. The latest record remains Recycler on October 25.

No weights or datasets downloaded, no model execution, no external mutation. X announcement fetch returned HTTP 403 and was not retried or bypassed. Initial HF direct-open failures were extraction errors; ordinary links from the public file tree successfully exposed history, commit and discussion.

Focused tests (`ai-nanbeige-release`, `ai-recent-updates`, `ai-releases`, `kimi-evaluation-detail`) passed 14/14; catalog validation and coverage generation passed. Astro check passed across 157 files with zero errors, warnings or hints using `ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/timeline-astro-config` after the default config path failed. Main task owns the full suite, build, rendered QA and publication. The initial focused run correctly exposed an outdated explicit model-ID expectation, which was updated for the new model.
