## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-07-28 - Semantic HTML in Glass-Card Components
**Learning:** Semantic HTML relationships like 'htmlFor'/'id' and 'aria-label' are often omitted in 'glass-card' form components in favor of visual proximity grouping. This breaks screen reader associations.
**Action:** Always explicitly enforce 'htmlFor'/'id' pairings and 'aria-label' attributes when modifying these components.
