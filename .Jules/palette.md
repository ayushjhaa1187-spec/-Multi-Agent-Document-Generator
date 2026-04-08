## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Chat Inputs & Keyboard Nav
**Learning:** In AI chat interfaces, users expect multiline inputs but typically submit via `Enter` to preserve flow. A standard `<input>` frustrates them by blocking newlines, while a standard `<textarea>` breaks the fast submission pattern and looks clunky if its height doesn't scale with content.
**Action:** Always use `<textarea>` elements for AI chat prompts. Ensure they auto-resize vertically based on content (e.g. using `scrollHeight`) and allow scrolling (`overflow-y-auto`) when exceeding max-height. Manually handle the `Enter` key to submit the form while preserving `Shift+Enter` for newlines. Crucially, check `!e.nativeEvent.isComposing` to gracefully support Input Method Editors (IMEs). Include appropriate accessibility wrappers like `aria-label`.
