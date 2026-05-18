## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-05-18 - Auto-resizing Textareas in Flex Layouts
**Learning:** When replacing single-line inputs with auto-resizing textareas in flex rows, sibling elements (like buttons) may stretch unintentionally unless cross-axis alignment (e.g., items-end) is applied. Additionally, using form.requestSubmit() on 'Enter' requires checking !e.nativeEvent.isComposing to prevent premature submissions during IME composition.
**Action:** Always apply explicit alignment to flex containers when introducing auto-resizing textareas, and handle IME composition state in onKeyDown event listeners.
