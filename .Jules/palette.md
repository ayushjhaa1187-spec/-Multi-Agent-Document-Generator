## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-02-28 - Auto-resizing textarea for AI chat
**Learning:** For multiline AI chat inputs, replacing `<input>` with an auto-resizing `<textarea>` significantly improves UX for longer prompts. Key details to handle are preventing default submission on Enter (without Shift), catching IME composition (`!e.nativeEvent.isComposing`), and preserving `scrollTop` during the resize calculation to avoid scroll-jumping. Adding 2px to `scrollHeight` is also necessary when using Tailwind to account for `box-sizing: border-box`.
**Action:** Always use `<textarea>` for chat-style AI inputs and implement manual form submission via `e.currentTarget.form?.requestSubmit()`.
