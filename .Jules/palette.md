## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-23 - Form Accessibility (Label/Input Links)
**Learning:** In Next.js/React applications, visually grouping labels and inputs within a div or form is insufficient for screen readers. Explicit `htmlFor` and `id` pairings, along with `aria-label` attributes, are critical for programmatic association and providing proper context.
**Action:** Always ensure that every `<label>` has an `htmlFor` attribute that strictly matches the `id` of its corresponding `<input>`, and use `aria-label` for inputs without visible labels.
