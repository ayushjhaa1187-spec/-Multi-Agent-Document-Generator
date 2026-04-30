## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textarea Pattern
**Learning:** When implementing auto-resizing textareas in React with Tailwind CSS, two critical details ensure a smooth UX: 1) Add 2px to the `scrollHeight` calculation to account for Tailwind's `border-box` sizing (preventing persistent scrollbars and jitter), and 2) use `e.currentTarget.form?.requestSubmit()` in the `onKeyDown` Enter handler to successfully trigger React's synthetic `onSubmit` event. Additionally, adding `min-w-0` is crucial when the textarea is a flex child to prevent horizontal overflow.
**Action:** Always include the 2px offset for Tailwind textareas, utilize `requestSubmit()` for programmatically submitting forms, and add `min-w-0` to flex child textareas.
