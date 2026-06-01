## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-01 - Form Control Associations and Invisible Labels
**Learning:** Inputs without visible labels (like inline chat inputs) need explicit `aria-label` attributes for screen readers. Visible labels must always be explicitly linked to their inputs using `htmlFor` and `id` to ensure clicking the label focuses the input, which is particularly helpful for users with motor impairments.
**Action:** Always link visible labels to inputs with `htmlFor`/`id`, and always provide an `aria-label` for standalone inputs without visible text labels.
