import test from "node:test";
import assert from "node:assert/strict";
import {
  civilYear,
  dateBounds,
  formatTime,
  overlaps,
  parseDate,
  timePosition,
  validDate,
  yearCoordinate,
  yearTicks,
} from "../src/core/time";
import {
  defaultView,
  readView,
  selectEvents,
  viewQuery,
} from "../src/core/catalog";
import { validateCatalog } from "../src/core/validate";
import {
  clusterItems,
  intervalGeometry,
  packIntervals,
} from "../src/core/layout";
import { chinaHistory } from "../src/topics/china-history/catalog";
import { aiCatalog } from "../src/topics/ai/adapter";

test("BCE and CE form a continuous axis without a civil year zero", () => {
  assert.equal(yearCoordinate(-1), 0);
  assert.equal(yearCoordinate(1), 1);
  assert.equal(civilYear(0), -1);
  assert.throws(() => yearCoordinate(0));
  assert.equal(
    dateBounds(parseDate("-0001"))[1],
    dateBounds(parseDate("0001"))[0],
  );
  assert.ok(
    timePosition({ kind: "point", start: parseDate("-0221") }) <
      timePosition({ kind: "point", start: parseDate("-0202") }),
  );
  assert.equal(
    formatTime({ kind: "point", start: { year: -2070, approximate: true } }),
    "约 公元前 2070 年",
  );
});
test("partial dates preserve precision and early CE leap years avoid JS Date 1900 offset", () => {
  assert.deepEqual(parseDate("0626"), { year: 626 });
  assert.equal(validDate({ year: 4, month: 2, day: 29 }), true);
  assert.equal(validDate({ year: 100, month: 2, day: 29 }), false);
  assert.equal(validDate({ year: 2024, month: 2, day: 29 }), true);
  assert.equal(validDate({ year: 2025, month: 2, day: 29 }), false);
  assert.equal(validDate({ year: 1, day: 1 }), false);
  assert.throws(() => parseDate("0000"));
});
test("duration is visible when only its middle overlaps the viewport", () => {
  const war = chinaHistory.events.find((e) => e.id === "an-shi")!;
  assert.ok(overlaps(war.time, 760, 761));
  assert.ok(!overlaps(war.time, 764, 765));
  const view = { ...defaultView(chinaHistory, "tang"), from: 760, to: 761 };
  assert.deepEqual(
    selectEvents(chinaHistory, view).map((e) => e.id),
    ["an-shi"],
  );
  assert.deepEqual(intervalGeometry(755, 764, 760, 761), {
    left: 0,
    width: 100,
  });
});
test("period membership differs from coincidence and shared events are not duplicated", () => {
  const tang = selectEvents(chinaHistory, {
    ...defaultView(chinaHistory, "tang"),
    category: "battle",
  });
  assert.deepEqual(
    tang.map((e) => e.id),
    ["hulao", "eastern-turks", "talas"],
  );
  assert.ok(!tang.some((e) => e.id === "an-shi"));
  for (const id of ["song", "southern-song", "jin", "song-era"]) {
    const result = selectEvents(chinaHistory, {
      ...defaultView(chinaHistory, id),
      category: "battle",
    });
    assert.equal(result.filter((e) => e.id === "caishi").length, 1);
  }
  const unrelated = selectEvents(chinaHistory, {
    ...defaultView(chinaHistory, "western-xia"),
    category: "battle",
  });
  assert.equal(unrelated.length, 0);
});
test("views round-trip BCE years, expansion, filters and selected events", () => {
  const view = {
    ...defaultView(chinaHistory),
    from: yearCoordinate(-221),
    to: 1279,
    period: "song-era",
    category: "battle",
    q: "采石",
    all: true,
    selected: "caishi",
    expanded: ["song-era", "song"],
  };
  assert.deepEqual(readView(viewQuery(view), chinaHistory), view);
  const all = { ...defaultView(chinaHistory), category: "" };
  assert.equal(
    readView(viewQuery(all), chinaHistory, "", "battle").category,
    "",
  );
  const dirty = readView(
    "?from=0&to=NaN&period=missing&category=nope&event=missing&expand=tang,tang,missing",
    chinaHistory,
  );
  assert.equal(dirty.from, defaultView(chinaHistory).from);
  assert.equal(dirty.selected, "");
  assert.equal(dirty.period, "");
  assert.deepEqual(dirty.expanded, ["tang"]);
  assert.equal(readView("?period=qin", chinaHistory, "tang").period, "tang");
});
test("millennia-scale ticks and small screens remain finite and clustering keeps every event", () => {
  assert.ok(yearTicks(-2069, 1912, 800).includes(yearCoordinate(-2000)));
  for (const width of [160, 320, 800]) {
    const ticks = yearTicks(-2069, 1912, width);
    assert.ok(ticks.length > 0 && ticks.length < 20);
    assert.ok(ticks.every(Number.isFinite));
    const events = selectEvents(chinaHistory, {
      ...defaultView(chinaHistory),
      all: true,
    });
    const grouped = clusterItems(
      events,
      (e) => (timePosition(e.time) + 2069) / 3982,
      width,
    );
    assert.deepEqual(
      grouped.flatMap((c) => c.events.map((e) => e.id)),
      events.map((e) => e.id),
    );
  }
});
test("concurrent regimes occupy separate rows while same-year succession can share the main line", () => {
  const periods = chinaHistory.periods.filter((p) =>
    ["liao", "jin", "song"].includes(p.id),
  );
  assert.equal(
    packIntervals(
      periods,
      (p) => [
        yearCoordinate(p.time.start.year),
        yearCoordinate(p.time.end!.year) + 1,
      ],
      1,
    ).length,
    3,
  );
  assert.equal(
    packIntervals(
      [
        { start: 1, end: 11 },
        { start: 10, end: 20 },
      ],
      (p) => [p.start, p.end],
      1,
    ).length,
    1,
  );
});
test("both catalogs validate; broken references, cycles and reversed dates fail", () => {
  assert.deepEqual(validateCatalog(chinaHistory), []);
  assert.deepEqual(validateCatalog(aiCatalog), []);
  const broken = structuredClone(chinaHistory);
  broken.periods[0].parentId = broken.periods[0].id;
  broken.events[0].sourceIds = ["missing"];
  broken.events[1].time = {
    kind: "duration",
    start: { year: 10 },
    end: { year: -1 },
  };
  const errors = validateCatalog(broken);
  assert.ok(errors.some((e) => e.includes("cycle")));
  assert.ok(errors.some((e) => e.includes("missing")));
  assert.ok(errors.some((e) => e.includes("reversed")));
});
