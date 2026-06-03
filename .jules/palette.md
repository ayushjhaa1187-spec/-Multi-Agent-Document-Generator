## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-03 - Confirmation Dialog for Destructive Actions
**Learning:** Destructive actions that clear significant user progress (like changing a project and resetting all chat history) without confirmation can lead to severe frustration.
**Action:** Always add a confirmation dialog (e.g., `window.confirm`) and clear ARIA labels for buttons that perform irreversible state-clearing actions to protect user effort.