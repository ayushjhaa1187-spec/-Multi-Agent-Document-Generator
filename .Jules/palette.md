## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-02-18 - Multiline Chat Inputs and IME Safety
**Learning:** AI chat interfaces using `<input>` severely limit the user experience for long or formatted prompts. Transitioning to an auto-resizing `<textarea>` improves usability significantly. However, catching the "Enter" key for submission introduces issues for users of Input Method Editors (IMEs) who use "Enter" to confirm composition. Additionally, message streaming causes all list items in a chat (like `CopyButton`) to re-render constantly.
**Action:** Always use `<textarea>` for chat interfaces, handle `Shift+Enter` for newlines, strictly check `!e.nativeEvent.isComposing` before submitting on Enter to support IMEs, and memoize static list item components with `React.memo` to prevent jank during streaming.
