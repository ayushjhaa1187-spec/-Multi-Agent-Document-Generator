## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-28 - Auto-Resizing Textareas in Chat Interfaces
**Learning:** When using auto-resizing textareas, setting height to 'auto' can cause scroll jumps on mobile. Storing and restoring `window.scrollY` prevents this. Additionally, using `items-end` in the flex container prevents buttons from stretching, and `overflow-y-auto` is essential when a max-height is enforced. Checking `!e.nativeEvent.isComposing` on 'Enter' key submission is critical for IME users (e.g. typing CJK characters) to avoid accidental submissions.
**Action:** Use a specific pattern combining `useRef`, `window.scrollY` preservation, and `items-end` for all chat-style auto-resizing textareas, and always account for IME composition on `onKeyDown` submissions.
