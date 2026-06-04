## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-04 - Destructive Action Confirmation
**Learning:** In chat interfaces, buttons that silently clear state (like changing contexts or projects) can lead to massive data loss and frustration. Users expect warnings for destructive actions that delete conversational history. Also, simple text buttons often lack proper focus states for keyboard users.
**Action:** Always add `window.confirm` (or a custom modal) for actions that wipe out user-generated content or chat history. Ensure text-only buttons have `focus-visible:ring` to maintain keyboard accessibility.
