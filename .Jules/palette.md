## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textarea Input
**Learning:** Using an auto-resizing `<textarea>` instead of a standard `<input>` significantly improves UX for AI chat interfaces by accommodating multiline queries while preserving horizontal space. Proper implementation requires adding 2px to `scrollHeight` to prevent scrollbar flickering caused by Tailwind's `box-sizing: border-box`, using `scrollTop` preservation to prevent jumping, and gracefully handling IME input with `!e.nativeEvent.isComposing`.
**Action:** For all AI chat or long-form inputs, use an auto-resizing `textarea` with `overflow-y-auto`, explicit height bounds (`max-h-[...]`), and manual 'Enter' key submission that correctly handles IME events and React synthetic `requestSubmit()`.
