## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-04 - Semantic HTML in Glass Card Forms
**Learning:** The 'glass-card' form components in this repository often omit semantic HTML relationships (like 'htmlFor'/'id' pairings and 'aria-label' attributes) in favor of visual proximity grouping, creating accessibility barriers for screen-reader users.
**Action:** Explicitly enforce 'htmlFor'/'id' pairings and 'aria-label' attributes on all form inputs within 'glass-card' components to ensure proper semantic relationships.
