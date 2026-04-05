## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Multi-line Chat Input
**Learning:** Using a `<textarea>` instead of an `<input>` for AI chat interfaces significantly improves UX by allowing users to compose multi-line prompts naturally. However, it requires careful handling: auto-resizing based on `scrollHeight` (adding 2px for borders) to avoid scrollbar flickering, preserving `scrollTop` to prevent jumping during resize, and manually handling the 'Enter' key (`e.currentTarget.form?.requestSubmit()`) while respecting IMEs (`!e.nativeEvent.isComposing`) and preserving 'Shift+Enter' for newlines.
**Action:** Always use an auto-resizing `<textarea>` for chat interfaces, ensuring proper keyboard handling (Enter vs Shift+Enter), IME support, and accessibility (`aria-label`).
