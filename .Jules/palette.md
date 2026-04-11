## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textareas & IME
**Learning:** When building an auto-resizing textarea that submits on Enter, it's critical to check `!e.nativeEvent.isComposing` in the `onKeyDown` handler. If this is missing, users relying on Input Method Editors (IMEs) for languages like Japanese or Chinese will accidentally submit the form while trying to confirm their character selection. Additionally, preserving the current `scrollTop` before adjusting the `height` to `auto` prevents annoying scroll-jumping.
**Action:** For all chat interfaces, use auto-resizing textareas over single-line inputs, explicitly handle IME composition in keyboard event handlers, and use `e.currentTarget.form?.requestSubmit()` to trigger React synthetic events.
