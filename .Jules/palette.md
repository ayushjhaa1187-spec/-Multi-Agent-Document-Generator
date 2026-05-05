## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textareas for Chat Inputs
**Learning:** Using a single-line input for chat makes it difficult to read and edit long messages. An auto-resizing textarea improves the user experience significantly, but requires careful handling of height calculation (`scrollHeight + 2px` for borders) and scroll position (`scrollTop`) to prevent flickering. Also, ensuring it submits on Enter (and allows Shift+Enter for newlines) while ignoring IME composition prevents accidental submissions.
**Action:** Implement auto-resizing textareas with explicit height management and robust `onKeyDown` handlers for all chat-like input fields.
