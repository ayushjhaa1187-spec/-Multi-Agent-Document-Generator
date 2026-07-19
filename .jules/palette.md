## 2024-07-19 - Form Label Accessibility and Input ARIA Labels
**Learning:** React inputs without associated labels or ARIA labels create significant barriers for screen reader users, especially in dynamically changing UI states like chat input forms where the context changes based on the step.
**Action:** Always associate labels with inputs using `htmlFor` and `id`, and add dynamic `aria-label` attributes to inputs that don't have visible text labels, especially when the placeholder text changes based on app state.
