## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-06-24 - Destructive Action Confirmation
**Learning:** Destructive actions that clear significant user context (like resetting a chat or changing a project mid-progress) without a warning cause severe frustration. Native `window.confirm` dialogs provide an immediate, accessible safety net for such actions before a user loses their work.
**Action:** Always wrap state-clearing or destructive UI actions (such as changing projects or clearing chat history) in a native `window.confirm` dialog or a custom modal to prevent accidental data loss.
