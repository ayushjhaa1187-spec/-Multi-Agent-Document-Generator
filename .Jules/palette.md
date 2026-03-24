## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - IME handling in AI Chat Interfaces
**Learning:** When implementing 'Enter' to submit in an auto-resizing chat textarea, it's critical to check `!e.nativeEvent.isComposing`. Without this, users relying on Input Method Editors (IMEs) for international languages will accidentally submit the form prematurely while composing characters.
**Action:** Always include `!e.nativeEvent.isComposing` in `onKeyDown` handlers for chat inputs to ensure accessible and frustration-free text entry for international users.
