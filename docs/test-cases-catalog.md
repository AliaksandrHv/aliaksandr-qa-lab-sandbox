# Test Case Catalog (110 Cases)

This is a living catalog for expanding the QA scope of this project.

- Current automated suite: 15 tests (`tests/ui.spec.ts`)
- Goal: 100+ unique, useful cases across positive, negative, and edge conditions
- Status values:
`Automated`: already covered in Playwright
`Planned`: not automated yet

| ID | Area | Type | Priority | Status | Scenario and Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-001 | Login | Positive | P0 | Automated | Valid email and password with flaky toggle OFF should show `Logged in`. |
| TC-002 | Login | Edge | P0 | Automated | With flaky toggle OFF and forced low random value, login should still show `Logged in`. |
| TC-003 | Login | Positive | P1 | Planned | Email with leading/trailing spaces should be trimmed and accepted if credentials are valid. |
| TC-004 | Login | Negative | P0 | Planned | Invalid email with valid password should show `Invalid credentials`. |
| TC-005 | Login | Negative | P0 | Automated | Valid email with invalid password should show `Invalid credentials`. |
| TC-006 | Login | Negative | P0 | Planned | Invalid email and invalid password should show `Invalid credentials`. |
| TC-007 | Login | Negative | P1 | Planned | Empty email with any password should show `Invalid credentials`. |
| TC-008 | Login | Negative | P1 | Planned | Empty password with valid email should show `Invalid credentials`. |
| TC-009 | Login | Negative | P0 | Automated | Flaky toggle ON and forced low random value should show `Server error, try again`. |
| TC-010 | Login | Edge | P1 | Planned | Flaky toggle ON and forced high random value with valid credentials should show `Logged in`. |
| TC-011 | Login | Edge | P1 | Planned | First attempt server error, second attempt success should update status to `Logged in`. |
| TC-012 | Login | Edge | P1 | Planned | First attempt success, second attempt invalid should update status to `Invalid credentials`. |
| TC-013 | Login | Edge | P2 | Planned | Very long email string should not break UI and should result in `Invalid credentials`. |
| TC-014 | Login | Edge | P2 | Planned | Password with special symbols should not break UI and should return expected status. |
| TC-015 | Login | Negative | P2 | Planned | Email case mismatch (`QA@example.com`) should be rejected if app is case-sensitive. |
| TC-016 | Login | Negative | P2 | Planned | Password case mismatch (`pass123!`) should be rejected. |
| TC-017 | Login | Edge | P2 | Planned | Rapid double-click on submit should not crash and should end with a valid final status text. |
| TC-018 | Login | Integration | P2 | Planned | Login should work normally even when table API error toggle is ON. |
| TC-019 | Login | Integration | P2 | Planned | Login should work normally even when slow network toggle is ON. |
| TC-020 | Login | Integration | P2 | Planned | Reload should clear login status text (ephemeral UI state). |
| TC-021 | Search | Positive | P0 | Automated | Typing plain text should update status to `Typing: <text>`. |
| TC-022 | Search | Edge | P1 | Planned | Clearing input should set status to `Typing: `. |
| TC-023 | Search | Edge | P2 | Planned | Leading spaces in search should be reflected exactly in status text. |
| TC-024 | Search | Edge | P2 | Planned | Special characters in search should be rendered without JS errors. |
| TC-025 | Search | Edge | P2 | Planned | Unicode characters in search should render correctly in status text. |
| TC-026 | Search | Edge | P2 | Planned | Very long search string should not freeze UI. |
| TC-027 | Search | Edge | P2 | Planned | Rapid typing should always display the latest input value. |
| TC-028 | Search | Integration | P1 | Planned | Search typing should not change table rows or page info. |
| TC-029 | Search | Integration | P2 | Planned | Search typing should not affect login behavior. |
| TC-030 | Search | Integration | P2 | Planned | Search typing should not affect modal open/close behavior. |
| TC-031 | Search | Edge | P2 | Planned | Search status should reset after full page reload. |
| TC-032 | Search | Edge | P2 | Planned | Paste input operation should update status exactly once with pasted value. |
| TC-033 | Table | Positive | P0 | Automated | Initial page info should be `Page 1 of 3`. |
| TC-034 | Table | Positive | P0 | Automated | Initial table should render 2 rows. |
| TC-035 | Table | Positive | P1 | Automated | Initial page 1 rows should include `Hammer` and `Screwdriver`. |
| TC-036 | Table | Positive | P0 | Automated | Clicking Next from page 1 should show `Page 2 of 3`. |
| TC-037 | Table | Positive | P1 | Planned | Page 2 rows should include `Laptop` and `Phone`. |
| TC-038 | Table | Positive | P0 | Automated | Clicking Next from page 2 should show `Page 3 of 3`. |
| TC-039 | Table | Positive | P1 | Planned | Page 3 rows should include `Wrench` and `Tablet`. |
| TC-040 | Table | Edge | P0 | Automated | Clicking Next beyond last page should remain on `Page 3 of 3`. |
| TC-041 | Table | Positive | P0 | Automated | Clicking Prev from page 3 should return `Page 2 of 3`. |
| TC-042 | Table | Edge | P0 | Automated | Clicking Prev from page 1 should remain `Page 1 of 3`. |
| TC-043 | Table | Positive | P1 | Automated | Selecting `device` from page 2 should reset and show `Page 1 of 2`. |
| TC-044 | Table | Positive | P1 | Planned | Device page 1 should show `Laptop` and `Phone`. |
| TC-045 | Table | Positive | P1 | Planned | Device page 2 should show `Tablet` with row count 1. |
| TC-046 | Table | Edge | P1 | Planned | Next on device page 2 should remain `Page 2 of 2`. |
| TC-047 | Table | Positive | P1 | Planned | Selecting `tool` should show `Page 1 of 2` with tool items. |
| TC-048 | Table | Positive | P1 | Planned | Tool page 2 should include `Wrench`. |
| TC-049 | Table | Integration | P1 | Planned | Switching category back to `all` should reset to `Page 1 of 3`. |
| TC-050 | Table | Negative | P0 | Automated | API error toggle ON should render `Server error (500)` row. |
| TC-051 | Table | Negative | P0 | Automated | In API error mode, page info should be empty. |
| TC-052 | Table | Recovery | P0 | Automated | Turning API error toggle OFF should restore normal table rendering. |
| TC-053 | Table | Edge | P1 | Planned | API error mode should persist across pagination button clicks. |
| TC-054 | Table | Positive | P0 | Automated | Slow network toggle ON should show loader during render and hide after completion. |
| TC-055 | Table | Edge | P1 | Planned | Slow network OFF should keep loader hidden after render completes. |
| TC-056 | Table | Edge | P2 | Planned | Rapid Next clicks with slow network ON should resolve to valid page state without crash. |
| TC-057 | Toggles | Edge | P1 | Planned | Fresh isolated context should start with all bug toggles unchecked. |
| TC-058 | Toggles | Persistence | P0 | Automated | `bug-flaky-login` checked state should persist after reload. |
| TC-059 | Toggles | Persistence | P1 | Planned | `bug-flaky-login` unchecked state should persist after reload. |
| TC-060 | Toggles | Persistence | P0 | Automated | `bug-slow-network` checked state should persist after reload. |
| TC-061 | Toggles | Persistence | P1 | Planned | `bug-slow-network` unchecked state should persist after reload. |
| TC-062 | Toggles | Persistence | P1 | Planned | `bug-table-error` checked state should persist after reload. |
| TC-063 | Toggles | Persistence | P1 | Planned | `bug-table-error` unchecked state should persist after reload. |
| TC-064 | Toggles | Persistence | P2 | Planned | `bug-case-sensitive-search` checked state should persist after reload. |
| TC-065 | Toggles | Persistence | P2 | Planned | `bug-offbyone-pagination` checked state should persist after reload. |
| TC-066 | Toggles | Persistence | P1 | Planned | Multiple toggles changed together should all persist correctly. |
| TC-067 | Toggles | Storage | P1 | Planned | Toggle check should write `true` string in localStorage for each key. |
| TC-068 | Toggles | Storage | P1 | Planned | Toggle uncheck should write `false` string in localStorage for each key. |
| TC-069 | Toggles | Storage | P2 | Planned | No unexpected localStorage keys should be created by toggle logic. |
| TC-070 | Toggles | Integration | P2 | Planned | Toggling checkboxes should not change login field values. |
| TC-071 | Toggles | Integration | P2 | Planned | Toggling checkboxes should not clear search input state in-session. |
| TC-072 | Toggles | Integration | P2 | Planned | Toggling checkboxes should not close an open modal unexpectedly. |
| TC-073 | Toggles | Integration | P2 | Planned | Toggling case-sensitive/off-by-one flags should not break unrelated flows. |
| TC-074 | Toggles | Edge | P1 | Planned | Clearing localStorage then reloading should reset all toggles to unchecked. |
| TC-075 | Toggles | Edge | P1 | Planned | Persisted API error ON should show error row immediately on first render after reload. |
| TC-076 | Toggles | Edge | P1 | Planned | Persisted slow network ON should show loader on first render after reload. |
| TC-077 | Modal | Positive | P0 | Automated | Clicking `Open modal` should display modal overlay. |
| TC-078 | Modal | Positive | P0 | Automated | Clicking `Close` should hide modal. |
| TC-079 | Modal | Positive | P0 | Automated | Clicking overlay background should hide modal. |
| TC-080 | Modal | Positive | P0 | Automated | Pressing `Escape` should hide modal. |
| TC-081 | Modal | Positive | P0 | Automated | Clicking `Confirm` should hide modal and show toast. |
| TC-082 | Modal | Positive | P1 | Planned | Toast text after confirm should include `Confirmed`. |
| TC-083 | Modal | Edge | P1 | Planned | Toast should auto-hide after timeout. |
| TC-084 | Modal | Edge | P2 | Planned | Re-opening modal after close should still work repeatedly. |
| TC-085 | Modal | Edge | P2 | Planned | Pressing `Escape` when modal is closed should not throw errors. |
| TC-086 | Modal | Edge | P2 | Planned | Clicking inside modal content should not close modal unintentionally. |
| TC-087 | Modal | Edge | P2 | Planned | Modal should be hidden on initial page load. |
| TC-088 | Modal | Edge | P2 | Planned | Toast should be hidden on initial page load. |
| TC-089 | Modal | Integration | P2 | Planned | Modal interactions should work while table API error is ON. |
| TC-090 | Modal | Integration | P2 | Planned | Modal interactions should work while slow network toggle is ON. |
| TC-091 | Workflow | Integration | P1 | Planned | Invalid login then valid login should update final status to `Logged in`. |
| TC-092 | Workflow | Integration | P1 | Planned | Valid login then invalid login should update final status to `Invalid credentials`. |
| TC-093 | Workflow | Integration | P1 | Planned | Search then paginate should keep both features functioning independently. |
| TC-094 | Workflow | Integration | P1 | Planned | Filter category then open/close modal should preserve table page info. |
| TC-095 | Workflow | Integration | P1 | Planned | API error ON then OFF with reload should restore normal table flow. |
| TC-096 | Workflow | Integration | P1 | Planned | Flaky login ON causing server error, then OFF should allow successful login. |
| TC-097 | Workflow | Integration | P2 | Planned | Slow network ON with modal open/close cycle should not lock UI. |
| TC-098 | Workflow | Integration | P2 | Planned | Confirm action toast should not alter login or table state. |
| TC-099 | Workflow | Integration | P2 | Planned | Reload should persist toggles but clear transient UI statuses where expected. |
| TC-100 | Workflow | Integration | P2 | Planned | Full user journey (login, search, paginate, filter, modal confirm) should complete with no errors. |
| TC-101 | A11y/UI | Positive | P1 | Planned | Page title should be non-empty and meaningful. |
| TC-102 | A11y/UI | Positive | P1 | Planned | Main heading (`h1`) should be visible on load. |
| TC-103 | A11y/UI | Positive | P1 | Planned | Products table should include headers `ID`, `Name`, `Category`. |
| TC-104 | A11y/UI | Positive | P2 | Planned | Core controls should have visible text labels. |
| TC-105 | A11y/UI | Edge | P2 | Planned | Keyboard Tab navigation should reach modal buttons when modal is open. |
| TC-106 | A11y/UI | Edge | P2 | Planned | Keyboard Enter/Space on focused buttons should trigger expected actions. |
| TC-107 | Reliability | P1 | Planned | No console errors during core happy-path workflow. |
| TC-108 | Reliability | P2 | Planned | Rapid toggle switching should not trigger uncaught exceptions. |
| TC-109 | Performance | P2 | Planned | Table transition with slow network OFF should complete quickly (project threshold). |
| TC-110 | Performance | P2 | Planned | Slow network ON should add visible delay and still complete without timeout failures. |

## Suggested implementation batches

- Batch 1 (P0/P1 high value): TC-003, TC-004, TC-006, TC-007, TC-008, TC-010, TC-011, TC-037, TC-039, TC-044, TC-045, TC-047, TC-048, TC-049, TC-053, TC-055, TC-062, TC-075, TC-082, TC-083
- Batch 2 (Persistence and integrations): TC-057, TC-059, TC-061, TC-063, TC-064, TC-065, TC-066, TC-067, TC-068, TC-074, TC-076, TC-091, TC-092, TC-093, TC-094, TC-095, TC-096, TC-099, TC-100
- Batch 3 (A11y/non-functional): TC-101 to TC-110
