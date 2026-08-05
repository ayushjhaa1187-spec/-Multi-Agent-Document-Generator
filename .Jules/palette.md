## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-05 - Explicit Label Association
**Learning:** In React components, explicitly linking labels to inputs using `htmlFor` and `id`, and adding `aria-label` to visually label-less inputs significantly improves screen reader accessibility.
**Action:** Always ensure every form input has an associated explicit label or a descriptive `aria-label` if a visual label is omitted.
