## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textareas
**Learning:** When using auto-resizing textareas, setting height to `auto` before calculating `scrollHeight` causes scroll position jumping and screen flicker, creating poor UX. Managing `scrollTop` across the calculation prevents this jank.
**Action:** Always save and restore `scrollTop` when dynamically updating textarea heights based on `scrollHeight`.
