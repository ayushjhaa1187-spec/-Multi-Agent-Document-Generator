## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - AI Chat Input Textarea
**Learning:** For AI chat interfaces, replacing a standard `<input>` with an auto-resizing `<textarea>` significantly improves UX for longer prompts. Ensuring Enter submits while Shift+Enter creates newlines, and gracefully handling IME composition (checking `!e.nativeEvent.isComposing`), is crucial for a smooth chatting experience across different languages and input methods.
**Action:** When implementing chat interfaces, always use an auto-resizing `<textarea>` (e.g., via `useEffect` tracking scrollHeight) with proper Enter/Shift+Enter and IME handling instead of a single-line input.
