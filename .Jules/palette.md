## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-02-18 - Semantic Form Associations
**Learning:** In React/Next.js components, visual grouping of labels and inputs is often used in place of proper semantic HTML attributes (`htmlFor`/`id`), hindering screen reader accessibility. Main content input fields without explicit labels also need `aria-label`s to give context for screen reader users.
**Action:** Always enforce semantic HTML pairings (`htmlFor`/`id`) for labels and inputs, and use `aria-label` on standalone input fields to ensure complete accessibility.
