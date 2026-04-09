## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textarea for Chat
**Learning:** Using a single-line input for chat interfaces often leads to a poor experience when users need to type longer messages or include line breaks. An auto-resizing textarea that grows with content while maintaining a reasonable maximum height provides a much better experience. Ensuring Enter submits the form while Shift+Enter adds a new line meets user expectations for chat interfaces. Adding an `aria-label` also ensures screen readers can identify the input correctly.
**Action:** When implementing chat or messaging interfaces, default to using an auto-resizing `<textarea>` instead of `<input type="text">`. Implement keyboard event handlers to support expected submit/newline behaviors and always include an appropriate `aria-label`.
