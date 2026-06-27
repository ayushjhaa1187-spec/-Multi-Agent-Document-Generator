## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-18 - Added confirmation before clearing chat history
**Learning:** Users can accidentally lose significant progress and context when changing projects, as the chat history is immediately cleared without warning. This is a destructive action that needs a safeguard.
**Action:** Always wrap state-clearing or destructive UI actions (such as changing projects or clearing chat history) in a native `window.confirm` dialog to prevent accidental data loss and preserve user context.
