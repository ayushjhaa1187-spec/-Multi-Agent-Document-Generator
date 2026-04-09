## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Textarea vs Input for Chat Prompts
**Learning:** Using a single-line `<input>` for chat interfaces (like BRD generation) causes friction when users need to type lengthy or complex requirements. Switching to a `<textarea>` significantly improves UX for verbose users, but it's crucial to implement "Enter to Submit" and "Shift+Enter for Newline" to maintain the expected chat interaction paradigm and keyboard accessibility.
**Action:** For all AI chat interfaces, use a `<textarea>` with appropriate `aria-label`, dynamic sizing (or scroll), and handle the "Enter" key submission manually while allowing "Shift+Enter" for multi-line formatting.
