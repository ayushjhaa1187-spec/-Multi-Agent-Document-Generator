## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-06-06 - Destructive Action Confirmation
**Learning:** In long-running AI generation tasks, instantly clearing the state (like changing projects) without confirmation causes frustrating data loss for users. A simple native window.confirm provides an immediate, zero-dependency safety net.
**Action:** Always wrap state-clearing or destructive actions in a confirmation dialog to prevent accidental loss of context.
