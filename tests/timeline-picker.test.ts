import test from 'node:test';
import assert from 'node:assert/strict';
import { selectedTimelineScrollLeft } from '../src/core/timeline-picker';

const viewport = { left: 20, width: 300, scrollLeft: 0, scrollWidth: 1200 };
test('reading path rail reveals an offscreen selection with the smallest horizontal shift', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 500, right: 730 }]), 410);
  assert.equal(selectedTimelineScrollLeft({ ...viewport, scrollLeft: 500 }, [{ left: -250, right: -20 }]), 230);
});
test('a visible selected path prevents multi-selection scroll competition', () => {
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 30, right: 260 }, { left: 500, right: 730 }]), undefined);
  assert.equal(selectedTimelineScrollLeft(viewport, [{ left: 900, right: 1130 }, { left: 500, right: 730 }]), 410);
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
});
