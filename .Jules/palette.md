## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-04-04 - Auto-Resizing Textareas in Next.js
**Learning:** When building multiline AI chat inputs in Next.js, replacing standard `<input>` elements with `<textarea>` requires careful handling to maintain a smooth UX and avoid SSR warnings. Specifically, calculating height based on `scrollHeight` must account for border widths (e.g., adding 2px for Tailwind's box-sizing) to prevent scrollbar flickering. Additionally, updating height dynamically must capture and restore `scrollTop` to prevent the viewport from unexpectedly jumping.
**Action:** Use `<textarea>` instead of `<input>` for chat prompts to allow multiline input. Implement the auto-resize logic within `useEffect` (not `useLayoutEffect` which triggers SSR warnings), preserve `scrollTop`, and explicitly handle Enter to submit (using `e.currentTarget.form?.requestSubmit()`) while preserving Shift+Enter for newlines.
