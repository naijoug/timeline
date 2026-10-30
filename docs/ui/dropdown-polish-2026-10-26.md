# Filter choice polish — 2026-10-26

The supplied desktop screenshot identified platform-native category, scope and order selects as visually inconsistent with the filter sheet. This change is limited to those shared sheet fields across the four topics, including the longer history period selector.

- Category/period now use a small, theme-aware select-only combobox with an explicit selected checkmark, keyboard active state and nested-period indentation. The option panel expands inside the existing scroll body instead of escaping behind the fixed footer. It has bounded independent scrolling.
- Region and ordering use native radio groups styled as segmented controls: their small option sets are visible without another click.
- Arrow/Home/End navigation, initial-character search, Enter/Space selection, Escape options-only dismissal, Tab and outside-pointer dismissal retain the sheet draft transaction. The sheet itself still closes separately and restores focus/scroll.
- No new dependencies, data changes, externally loaded assets or new credentials. Native year jump controls outside the sheet remain unchanged.

Verification: unit/interaction tests, four-topic production hydration, root and Pages-base builds and link checks, performance/reading checks. Real cloud Chromium desktop/light/dark/narrow and short-viewport visual/interaction checks. No real iOS Safari, physical touch or system virtual keyboard testing; screen-reader semantics are checked in DOM/AX, not spoken screen-reader testing.
