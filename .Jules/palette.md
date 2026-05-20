## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2026-05-20 - Prevent Accidental State Reset
**Learning:** Clearing chat state without warning can lead to frustrating data loss, especially after long conversational processes.
**Action:** Always add a confirmation step for destructive actions that reset critical user state, such as clearing a chat session.
