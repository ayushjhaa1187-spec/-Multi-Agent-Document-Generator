## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-04-15 - Auto-resizing Textarea for Chat Inputs
**Learning:** Using a single-line `<input>` for AI chat interfaces restricts users when writing complex, multiline prompts. Replacing it with an auto-resizing `<textarea>` that grows with content (up to a max-height) and supports "Shift+Enter" for newlines significantly improves the usability for complex queries. Handling IME composition during "Enter" submissions is crucial to prevent premature submissions for users typing in languages like Japanese or Chinese.
**Action:** Always use an auto-resizing `<textarea>` with proper "Enter" vs "Shift+Enter" and IME support (`!e.nativeEvent.isComposing`) instead of `<input type="text">` for any chat or AI prompt interfaces.
