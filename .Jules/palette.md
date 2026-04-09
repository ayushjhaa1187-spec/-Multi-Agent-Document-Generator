## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-03-28 - Auto-Resizing Textarea & React Synthetic Forms
**Learning:** When creating multi-line chat inputs using `<textarea>`, manually submitting the form with `e.currentTarget.form?.requestSubmit()` in an `onKeyDown` handler (for the `Enter` key) properly triggers React's synthetic `onSubmit` handler. Additionally, using a `useEffect` on the `input` value to reset height to `auto` then `scrollHeight` creates a smooth, native-feeling auto-resize behavior without layout thrashing.
**Action:** Always use `requestSubmit()` instead of `dispatchEvent(new Event('submit'))` when programmatically triggering React forms from child inputs.
