import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const header = source('src/components/Header.tsx');
const css = source('src/styles/navigation.css');

test('the shared navigation root is one opaque sticky layer in document flow', () => {
  assert.match(header, /return <div className="navigation-root" data-screen=\{screen\}>/);
  assert.match(css, /\.navigation-root\s*\{[^}]*position:sticky;[^}]*top:0;[^}]*z-index:50;[^}]*background:var\(--paper-bg\);/);
  assert.doesNotMatch(css, /(?:header|\.library-header)\s*\{[^}]*position:(?:fixed|sticky)/);
  for (const path of ['src/layouts/Layout.astro', 'src/pages/index.astro', 'src/components/timeline/Explorer.tsx']) {
    assert.match(source(path), /<Header\b/, path);
  }
});

test('desktop and phone have visible header controls for their respective navigation modes', () => {
  assert.match(header, /className="header-sidebar-toggle" onClick=\{toggle\}[^>]*aria-expanded=\{!collapsed\}[^>]*aria-controls="topic-navigation"/);
  assert.match(header, /className="mobile-nav-open"[^\n]*aria-expanded=\{mobileOpen\}[^\n]*aria-controls="topic-sidebar"[^\n]*aria-haspopup="dialog"/);
  assert.match(css, /\.header-sidebar-toggle\s*\{[^}]*display:flex;[^}]*width:44px;[^}]*height:44px;/);
  assert.match(css, /@media\(max-width:760px\)\s*\{[\s\S]*\.sidebar-toggle,\.header-sidebar-toggle\s*\{\s*display:none;/);
  assert.match(header, /localStorage\.setItem\('timeline-sidebar-collapsed', String\(next\)\)/);
  assert.match(header, /<AppearanceControl\s*\/>/);
});

test('anchor clearance tracks the actual header height instead of a fixed desktop-only offset', () => {
  assert.match(header, /<header ref=\{header\}/);
  assert.match(header, /setProperty\('--navigation-header-height', `\$\{Math\.ceil\(element\.getBoundingClientRect\(\)\.height\)\}px`\)/);
  assert.match(header, /new ResizeObserver\(measure\)/);
  assert.match(header, /window\.addEventListener\('resize', measure\)/);
  assert.match(header, /observer\?\.disconnect\(\)/);
  assert.match(css, /--navigation-scroll-offset:calc\(var\(--navigation-header-height\) \+ 16px\)/);
  assert.match(css, /html:has\(\.navigation-root\)\s*\{\s*scroll-padding-top:var\(--navigation-scroll-offset\)/);
});

test('safe-area padding and header sizing override theme rules on both screen sizes', () => {
  assert.match(css, /--navigation-safe-top:env\(safe-area-inset-top,0px\)/);
  assert.match(css, /html \.navigation-root > header\.library-header\s*\{\s*height:calc\(76px \+ var\(--navigation-safe-top\)\)/);
  assert.match(css, /html \.navigation-root > header\.library-header\s*\{[^}]*height:auto;[^}]*padding:calc\(12px \+ var\(--navigation-safe-top\)\)/);
  assert.match(css, /env\(safe-area-inset-bottom,0px\)/);
  assert.match(css, /env\(safe-area-inset-left,0px\)/);
  assert.match(css, /env\(safe-area-inset-right,0px\)/);
});

test('phone app bars expose the current level, a separate Back control, and right-hand actions', () => {
  assert.match(header, /screen\?: 'home' \| 'timeline' \| 'record'/);
  assert.match(header, /screen === 'home' \? '探索时间线' : screen === 'record' \? '事件详情'/);
  assert.match(header, /screen !== 'home' && <a className="mobile-app-back" href=\{backHref\}/);
  assert.match(header, /<div className="mobile-header-actions">[\s\S]*<AppearanceControl \/>[\s\S]*className="mobile-nav-open"/);
  assert.match(css, /\.mobile-app-back\s*\{[^}]*width:44px;[^}]*height:44px;/);
  assert.match(css, /grid-template-columns:44px minmax\(0,1fr\) auto/);
});

test('mobile search stays out of the compact bar until explicitly opened', () => {
  assert.match(header, /\[searchOpen, setSearchOpen\] = useState\(false\)/);
  assert.match(header, /className="mobile-search-toggle"[^\n]*aria-expanded=\{searchOpen\}[^\n]*aria-controls="current-topic-search"/);
  assert.match(css, /html \.navigation-root \.library-header \.atlas-search\s*\{\s*display:none;/);
  assert.match(css, /html \.navigation-root \.library-header\[data-search-open\] \.atlas-search\s*\{\s*display:flex;/);
  assert.match(header, /e\.key\.toLowerCase\(\) === 'k'[^\n]*openSearch\(\)/);
  assert.match(header, /event\.key === 'Escape' && searchOpen[^\n]*closeSearch\(\)/);
  assert.doesNotMatch(header, /type="hidden" name="(?:from|to)"/);
});

test('record Back validates destinations and avoids adding a detail-to-timeline history loop', () => {
  assert.match(header, /safeTimelineReturn\(value, location\.origin, prefix\)/);
  assert.match(header, /destination \? timelineReadingReturn\(destination\) : prefix/);
  assert.match(header, /const destination = resolveBackHref\(\);\s*event\.currentTarget\.href = destination/);
  assert.match(header, /event\.button !== 0 \|\| event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey\) return/);
  assert.match(header, /canUseTimelineHistoryBack\(destination, location\.origin, document\.referrer, history\.length, savedPositionUrl\)\) history\.back\(\)/);
  assert.match(header, /else location\.replace\(destination\)/);
});

test('the phone drawer remains above the scrim and the sticky header', () => {
  assert.match(css, /\.topic-sidebar\s*\{[^}]*position:fixed;[^}]*z-index:60;/);
  assert.match(css, /\.nav-scrim\s*\{[^}]*position:fixed;[^}]*z-index:59;[^}]*background:var\(--paper-scrim\)/);
  assert.match(css, /\.topic-sidebar\s*\{[^}]*visibility:hidden;/);
  assert.match(css, /\.topic-sidebar\.mobile-open\s*\{[^}]*visibility:visible;/);
});

test('drawer dismissal preserves focus, scroll position, background inertness, and keyboard containment', () => {
  assert.match(header, /menu\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(header, /desktopMenu\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(header, /if \(e\.key === 'Escape'\) \{ e\.preventDefault\(\); closeMobile\(\); \}/);
  assert.match(header, /const outside = !sidebar\.current\?\.contains\(document\.activeElement\)/);
  assert.match(header, /e\.shiftKey && \(document\.activeElement === first \|\| outside\)/);
  assert.match(header, /!e\.shiftKey && \(document\.activeElement === last \|\| outside\)/);
  assert.match(header, /el\.inert = true/);
  assert.match(header, /el\.inert = previousInert\[i\]/);
  assert.match(header, /document\.body\.style\.overflow = previousOverflow/);
  assert.match(header, /role=\{mobileOpen \? 'dialog' : undefined\} aria-modal=\{mobileOpen \|\| undefined\}/);
});
