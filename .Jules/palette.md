## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Multiline Chat Input
**Learning:** For AI chat interfaces, replacing single-line inputs with auto-resizing textareas provides a significantly better user experience for longer prompts. Implementing `onKeyDown` to submit on 'Enter' (with 'Shift+Enter' for newlines) is an expected pattern, but it's critical to check `!e.nativeEvent.isComposing` to prevent premature submissions when users are utilizing Input Method Editors (IMEs) for languages like Japanese or Chinese. Additionally, accounting for border-box styling (e.g. adding 2px to `scrollHeight`) prevents annoying scrollbar flickering.
**Action:** Always use auto-resizing textareas for chat inputs, ensure 'Enter' to submit checks for IME composition (`!e.nativeEvent.isComposing`), and correctly handle box-sizing differences in height calculations.
