## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Multi-line Chat Input
**Learning:** AI chat interfaces require multi-line input for complex prompts. Using an auto-resizing `<textarea>` instead of a standard `<input>` significantly improves the UX. Handling 'Enter' to submit and 'Shift+Enter' for newlines matches expected behavior in modern chat apps. It's crucial to check `!e.nativeEvent.isComposing` to support IMEs (Input Method Editors) properly.
**Action:** Always use auto-resizing `<textarea>` elements for AI chat inputs, and implement standard 'Enter'/'Shift+Enter' keyboard shortcuts with IME support.
