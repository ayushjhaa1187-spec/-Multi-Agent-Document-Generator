## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-12 - Submit Button Loading State
**Learning:** Having no accessible state when a button is loading forces screen reader users to guess what is happening. By introducing an `aria-label` that dynamically updates to indicate the "Sending message" state and maintaining clear visible feedback, the form's async status becomes fully perceivable and intuitive.
**Action:** Ensure all asynchronous submit buttons use a dynamic `aria-label` or `aria-live` region to clearly announce the loading state and maintain visible spinners.
