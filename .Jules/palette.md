## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-15 - Native Confirmation Dialog for Destructive UI Actions
**Learning:** Destructive actions that clear user state (like changing projects and clearing chat history) can lead to accidental data loss. Using `window.confirm` is an effective native solution to introduce friction and prevent unintended resets while maintaining accessibility without custom modals.
**Action:** Always wrap state-clearing UI actions in a native `window.confirm` to preserve user context and prevent frustration.
