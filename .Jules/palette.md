## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-Resizing Textarea Scroll Jumping
**Learning:** When implementing auto-resizing textareas in React, resetting height to 'auto' causes the page to lose its scroll position (scroll jumping). Storing and restoring `window.scrollY` and `textarea.scrollTop` before and after measuring `scrollHeight` ensures a smooth UX.
**Action:** Always store and restore scroll position values when dynamically measuring and updating scrollHeight on input elements.
