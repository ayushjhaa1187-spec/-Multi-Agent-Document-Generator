## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing textarea UX improvement
**Learning:** Replacing chat inputs with auto-resizing textareas significantly improves the UX for multi-line prompts. Using `useLayoutEffect` along with saving `scrollTop` and `window.scrollY` before height adjustments prevents layout jank and scroll jumping.
**Action:** Always implement auto-resizing textareas as flex children with `items-end`, `min-w-0`, and `resize-none` classes for consistent cross-browser layout without unintended stretching.
