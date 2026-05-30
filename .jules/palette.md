## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-30 - Form and Error Accessibility
**Learning:** Visible labels must be explicitly linked to their corresponding inputs using `htmlFor` and `id` to ensure proper screen reader association. Dynamic error containers injected into the DOM must include `role="alert"` and `aria-live="assertive"` so their contents are announced immediately to assistive technologies. Inputs lacking visible labels need an `aria-label`.
**Action:** Always link visible labels to inputs, ensure visually hidden inputs have ARIA labels, and configure dynamic alert/error elements as live regions.
