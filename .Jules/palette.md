## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-23 - Form Inputs Missing Identifiers
**Learning:** Some form inputs lack `id` attributes, yet have a `label` pointing to them via `htmlFor`. This creates a disconnect for screen readers and breaks accessibility for these components.
**Action:** Always ensure that form inputs have `id` attributes that correspond to the `htmlFor` property of their associated labels. Also, always add an `aria-label` to inputs that don't have explicit visual labels, like chat input text fields.
