## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textareas for AI Chat Inputs
**Learning:** Using a simple `<input type="text">` for AI chat interfaces provides poor UX for multi-line requirements and code snippets. Switching to an auto-resizing `<textarea>` significantly improves usability by allowing users to see their full input. However, when implementing manual "Enter" key submission in textareas, it's crucial to check `!e.nativeEvent.isComposing` to ensure users typing with Input Method Editors (IMEs), such as Pinyin or Romaji, can select characters without accidentally submitting the form.
**Action:** Always use `<textarea>` with auto-resize logic for AI chat inputs, ensure 'Shift+Enter' adds newlines, and check `isComposing` to preserve IME compatibility.
