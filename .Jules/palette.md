## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-15 - Missing Form Field Labels
**Learning:** Found critical form fields like 'Project Name' and chat input lacking proper semantic labels or `aria-label` attributes. Missing explicit associations lead to confusion for screen reader users on key interactive elements.
**Action:** Always link `<label htmlFor="X">` with `<input id="X">`, and provide an explicit `aria-label` for standalone inputs without a visual label.
