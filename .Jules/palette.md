## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textareas
**Learning:** When implementing auto-resizing textareas, simply setting `height: auto` then `scrollHeight` causes the page to jump. Storing `window.scrollY` and restoring it immediately after prevents this jarring layout shift. Checking `!e.nativeEvent.isComposing` on 'Enter' is critical to prevent premature submission while using an IME.
**Action:** Always include scroll-jumping prevention logic and IME checks when using auto-expanding textareas for chat inputs.
