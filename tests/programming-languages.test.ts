import test from "node:test";
import assert from "node:assert/strict";
import { programmingLanguages } from "../src/topics/programming-languages/catalog";
import { languagePresentation } from "../src/topics/programming-languages/presentation";
import { validateCatalog } from "../src/core/validate";
import { defaultExplorer, explorerEvents } from "../src/core/explorer";

test("programming language nodes remain routed, categorized and period-backed", () => {
  assert.deepEqual(validateCatalog(programmingLanguages), []);
  assert.equal(programmingLanguages.topic.path, "/programming-languages/");
  assert.equal(programmingLanguages.topic.periodSegment, "eras");

  const usedEntities = new Set(programmingLanguages.events.flatMap(e => e.entityIds));
  const usedSources = new Set(programmingLanguages.events.flatMap(e => e.sourceIds));
  assert.equal(usedEntities.size, programmingLanguages.entities.length);
  assert.equal(usedSources.size, programmingLanguages.sources.length);

  for (const category of programmingLanguages.topic.categories) {
    assert.ok(programmingLanguages.events.some(e => e.category === category.id), `${category.id}: no events`);
  }

  for (const event of programmingLanguages.events) {
    assert.ok(event.periodIds.length, `${event.id}: missing era routing`);
    for (const id of event.periodIds) {
      const period = programmingLanguages.periods.find(p => p.id === id)!;
      assert.ok(
        event.time.start.year >= period.time.start.year && event.time.start.year <= period.time.end!.year,
        `${event.id}: event is outside ${period.id}`,
      );
    }
  }
});

test("language explorer defaults expose the first compiler milestone and latest recorded release", () => {
  const state = defaultExplorer(programmingLanguages, "", "", languagePresentation);
  assert.equal(state.from, 1957);
  assert.equal(state.to, 2026);
  assert.equal(state.selected, "fortran-i");
  assert.ok(explorerEvents(programmingLanguages, state, languagePresentation).some(e => e.id === "python-313"));
});
