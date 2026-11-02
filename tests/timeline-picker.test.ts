import test from 'node:test';
import assert from 'node:assert/strict';
import { selectedTimelineScrollLeft } from '../src/core/timeline-picker';

const viewport = { left: 20, width: 300, scrollLeft: 0, scrollWidth: 1200 };
test('reading path rail reveals an offscreen selection with the nearest snap-aligned start', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 500, right: 730 }]), 480);
  assert.equal(selectedTimelineScrollLeft({ ...viewport, scrollLeft: 500 }, [{ left: -250, right: -20 }]), 230);
});
test('a visible selected path prevents multi-selection scroll competition', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 30, right: 260 }, { left: 500, right: 730 }]), undefined);
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 900, right: 1130 }, { left: 500, right: 730 }]), 480);
});
test('empty selections, desktop grids and hidden rails do not scroll', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, []), undefined);
  assert.equal(selectedTimelineScrollLeft({ ...viewport, scrollWidth: 300 }, [{ left: 500, right: 730 }]), undefined);
  assert.equal(selectedTimelineScrollLeft({ ...viewport, width: 0 }, [{ left: 500, right: 730 }]), undefined);
});
test('targets stay inside rail bounds and tolerate fractional layout rounding', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 19.5, right: 320.5 }]), undefined);
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 2000, right: 2230 }]), 900);
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: -500, right: -270 }]), 0);
  const mobile = { left: 18, width: 339, scrollLeft: 0, scrollWidth: 1330.2 };
  // 375px viewport, 18px page insets, 76% cards, 9px gaps and 3px rail padding.
  assert.ok(Math.abs(selectedTimelineScrollLeft(mobile, [{ left: 554.28, right: 811.92 }])! - 536.28) < 0.01);
  assert.ok(Math.abs(selectedTimelineScrollLeft(mobile, [{ left: 1087.56, right: 1345.2 }])! - 991.2) < 0.01);
});
