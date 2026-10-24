import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { programmingLanguages } from "../src/topics/programming-languages/catalog";
import { evolutionCheckedAt, evolutionEvents, evolutionRelations, evolutionSources } from "../src/topics/programming-languages/evolution-milestones";
import { languagePresentation } from "../src/topics/programming-languages/presentation";
import { defaultExplorer, explorerEvents, restoreExplorer } from "../src/core/explorer";
import { dateBounds } from "../src/core/time";
import { eventSourceIds, relationsFor } from "../src/core/evidence";
import { validateCatalog } from "../src/core/validate";

const byId = new Map(programmingLanguages.events.map(event => [event.id, event]));
const sources = new Map(programmingLanguages.sources.map(source => [source.id, source]));

test("language evolution batch has unique sourced nodes and resolvable earlier baselines", () => {
  assert.equal(evolutionEvents.length, 8);
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  for (const event of evolutionEvents) {
    assert.equal(programmingLanguages.events.filter(candidate => candidate.id === event.id).length, 1);
    assert.ok(event.details?.every(section => section.sourceIds?.length && section.locator));
    assert.ok(event.change && event.change.improvements.length >= 2);
    assert.ok(event.note);
    for (const id of eventSourceIds(event)) assert.ok(sources.has(id), `${event.id}: ${id}`);
  }
  for (const event of programmingLanguages.events) {
    if (!event.change?.baselineEventId) continue;
    const baseline = byId.get(event.change.baselineEventId);
    assert.ok(baseline, `${event.id}: missing baseline`);
    assert.ok(dateBounds(baseline.time.start)[0] < dateBounds(event.time.start)[0], `${event.id}: baseline must be earlier`);
    assert.ok(baseline.entityIds.some(id => event.entityIds.includes(id)), `${event.id}: unrelated comparison baseline`);
  }
  assert.ok(evolutionSources.every(source => source.checkedAt === evolutionCheckedAt && source.locator));
  // This is a focused review, not a claim that every old source was rechecked.
  assert.equal(sources.get("ibm-fortran")?.checkedAt, "2026-10-12");
});

test("approval dates, edition names, source versions and actual releases stay distinct", () => {
  const expectedDates = {
    "c89-standard": { year: 1989 },
    "c99-standard": { year: 1999, month: 12, day: 1 },
    "cpp-98": { year: 1998, month: 9 },
    "javascript-es5": { year: 2009, month: 12, day: 3 },
    "javascript-2017": { year: 2017, month: 6 },
    "rust-2018": { year: 2018, month: 12, day: 6 },
    "rust-139-async": { year: 2019, month: 11, day: 7 },
    "rust-2021": { year: 2021, month: 10, day: 21 },
    "rust-2024": { year: 2025, month: 2, day: 20 },
    "swift-55": { year: 2021, month: 9, day: 20 },
    "swift-6": { year: 2024, month: 9, day: 17 },
    "julia-paper": { year: 2012, month: 2, day: 14 },
  };
  for (const [id, date] of Object.entries(expectedDates)) assert.deepEqual(byId.get(id)?.time.start, date, id);
  assert.equal(sources.get("ecmascript5-approval")?.publishedAt, "2009-12-15");
  assert.equal(sources.get("c99-consolidated")?.publishedAt, "2007-09-07");
  assert.equal(sources.get("julia-paper")?.publishedAt, "2017-02-07");
  assert.equal(byId.get("julia-paper")?.title, "Julia 首次公开发布");
  assert.match(byId.get("julia-paper")!.note!, /不是 Julia 1.0/);
  assert.match(byId.get("rust-2024")!.note!, /2024 是 edition 名称/);
  for (const id of ["cpp-98", "cpp-11", "cpp-20", "c89-standard", "c99-standard", "javascript-es5", "javascript-2017"]) assert.equal(byId.get(id)?.category, "standard");
});

test("Rust async stabilization and Swift opt-in checking are not backdated or unconditional", () => {
  const rust2018 = byId.get("rust-2018")!;
  assert.match(rust2018.note!, /2019 年 Rust 1.39 才稳定/);
  assert.ok(!rust2018.change!.improvements.some(text => /async/.test(text)));
  const rust2024 = byId.get("rust-2024")!;
  assert.ok(!rust2024.change!.improvements.some(text => /async|std::io::Error/.test(text)));
  const swift6 = byId.get("swift-6")!;
  assert.match(swift6.summary, /可选择启用/);
  assert.match(swift6.note!, /升级编译器不等于/);
  assert.ok(!swift6.change!.improvements.some(text => /默认化/.test(text)));
});

test("C gains a readable language scope and latest jumps to the actual newest recorded date", () => {
  const cState = restoreExplorer("?scope=c&all=1&from=1957&to=2026", programmingLanguages, "", "", languagePresentation);
  assert.deepEqual(explorerEvents(programmingLanguages, cState, languagePresentation).map(event => event.id), ["c-creative-year", "c89-standard", "c99-standard"]);
  const state = defaultExplorer(programmingLanguages, "", "", languagePresentation);
  const latest = byId.get(languagePresentation.latestEvent!)!;
  assert.equal(latest.id, "rust-2024");
  assert.ok(explorerEvents(programmingLanguages, state, languagePresentation).some(event => event.id === latest.id));
  assert.ok(programmingLanguages.events.every(event => dateBounds(event.time.start)[0] <= dateBounds(latest.time.start)[0]));
});

test("lineage keeps evidence direction and is rendered by the language-only event route", () => {
  assert.equal(evolutionRelations.length, 5);
  for (const relation of evolutionRelations) {
    assert.ok(relation.sourceIds.length && relation.locator && relation.note);
    assert.ok(relationsFor(programmingLanguages, relation.fromEventId).includes(relation));
    assert.ok(relationsFor(programmingLanguages, relation.toEventId!).includes(relation));
  }
  const reverseInfluence = evolutionRelations.find(relation => relation.id === "c89-cpp-prototypes")!;
  assert.equal(reverseInfluence.fromEventId, "c89-standard");
  assert.equal(reverseInfluence.toEventId, "cpp-release");
  const route = readFileSync(new URL("../src/pages/programming-languages/events/[slug].astro", import.meta.url), "utf8");
  assert.match(route, /eventSourceIds\(event\)/);
  assert.match(route, /relationsFor\(programmingLanguages, event\.id\)/);
  assert.match(route, /<Relations catalog=\{programmingLanguages\}/);
  assert.match(route, /回看已收录基线/);
});
