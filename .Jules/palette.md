## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textarea UX
**Learning:** For chat interfaces, forcing users into a single-line input or requiring them to manually resize a textarea is poor UX. Using an auto-resizing textarea that allows Shift+Enter for newlines and Enter to submit dramatically improves the chat experience while maintaining clean UI until content requires more vertical space.
**Action:** When implementing chat or messaging inputs, prefer an auto-resizing textarea over a standard text input, ensuring the form still submits correctly on a standard Enter press.
