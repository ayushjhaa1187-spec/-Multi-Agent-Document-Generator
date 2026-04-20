## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2026-04-20 - Multiline Input Auto-resize
**Learning:** AI chat interfaces benefit greatly from multiline textareas rather than single-line inputs to allow complex thoughts, and using an auto-resizing approach with `scrollHeight` enhances readability without breaking layout.
**Action:** For chat and long-form conversational inputs, replace standard text inputs with auto-resizing textareas, capturing Enter for submit (while preserving Shift+Enter for newlines) and including `aria-label` for accessibility.
