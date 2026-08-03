## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-08-03 - Form Semantic Labeling vs Proximity
**Learning:** Visual proximity grouping is often used for form layouts (e.g., 'glass-card' components), but it leaves inputs disconnected from labels for screen readers. Explicit `htmlFor` and `id` pairing is necessary.
**Action:** When working on form components, always explicitly enforce `htmlFor`/`id` pairings or `aria-label` properties even when visual design relies on proximity grouping.
