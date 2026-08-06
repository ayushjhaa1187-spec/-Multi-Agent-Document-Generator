## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2026-08-06 - Adding explicit labels and aria-labels
**Learning:** Some inputs were missing `id` and `htmlFor` pairings, and some lacked `aria-label`s. Adding these improves accessibility.
**Action:** Always verify that every input element has an associated label or `aria-label`.
