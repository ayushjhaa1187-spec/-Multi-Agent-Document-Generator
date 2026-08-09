## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2026-08-09 - Form Accessibility and Dynamic ARIA Labels
**Learning:** Explicitly associating labels with inputs using `htmlFor` and `id` ensures screen readers correctly announce the field purpose. For dynamic inputs lacking a visual label, a context-aware `aria-label` provides essential guidance.
**Action:** Always link visible labels to inputs using ID references, and provide dynamic `aria-label` attributes for unlabeled interactive elements based on their current context.
