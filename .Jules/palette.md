## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-07-06 - Missing Confirmation for Destructive Actions
**Learning:** The "Change Project" action clears the entire conversation state silently without warning. Destructive actions that clear user data/progress must have a confirmation step to prevent accidental data loss.
**Action:** Always add a confirmation dialog (`window.confirm` or custom modal) to actions that clear form state or conversation history, and ensure they are keyboard accessible and have proper aria-labels describing what they do.
