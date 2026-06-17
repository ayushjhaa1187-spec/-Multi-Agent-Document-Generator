## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-17 - Prevent Accidental Data Loss
**Learning:** State-clearing UI actions that delete user progress (like clearing chat history or changing contexts) cause immense frustration when clicked accidentally.
**Action:** Always wrap destructive or state-clearing actions in a native `window.confirm` dialog or similar confirmation pattern to preserve user context and prevent accidental data loss.
