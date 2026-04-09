## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Unlinked Form Labels
**Learning:** Found custom styled labels (divs/spans) not associated with inputs via `htmlFor`/`id` or nesting. This breaks screen reader context.
**Action:** When using custom label components, ensure `htmlFor` matches input `id`, or nest the input inside the label.
