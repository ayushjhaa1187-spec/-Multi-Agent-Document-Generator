## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-03-07 - Auto-Resizing Chat Textareas
**Learning:** Using a regular `<input>` for chat limits users to single-line thoughts, which is frustrating for detailed requirements. However, standard `<textarea>` elements often don't submit on `Enter` by default (requiring a button click) or they don't grow with the content. The best UX is an auto-resizing `<textarea>` that submits on `Enter` (calling `formRef.current?.requestSubmit()`) and preserves `Shift+Enter` for newlines.
**Action:** When building chat interfaces, always use an auto-resizing `<textarea>` linked to a form reference instead of a standard `<input>`. Ensure it handles `Enter` to submit and `Shift+Enter` for line breaks, while retaining focus and ARIA labels.
