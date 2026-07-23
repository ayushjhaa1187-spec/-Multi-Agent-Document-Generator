## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Form Component Accessibility
**Learning:** The 'glass-card' form components in this application often omit semantic HTML relationships (like htmlFor/id pairings) and aria-label attributes in favor of visual proximity grouping.
**Action:** When modifying or creating forms, explicitly enforce htmlFor/id pairings for labeled inputs and aria-label attributes for icon/button-adjacent inputs to ensure screen reader accessibility.
