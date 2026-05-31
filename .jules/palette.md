## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-31 - Destructive Action Protection
**Learning:** In SPAs where state is kept in memory, providing a confirmation before executing destructive actions (like changing a project and wiping the chat) prevents accidental data loss and significantly improves user confidence.
**Action:** Implement `window.confirm` or a custom confirmation dialog for all actions that reset or destroy significant user-entered data.
