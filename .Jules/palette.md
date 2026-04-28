## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textareas in Next.js
**Learning:** Implementing auto-resizing textareas provides a huge UX win for multi-line chat inputs, but requires careful handling in Next.js to avoid SSR warnings and layout thrashing. Specifically, `useEffect` must be used instead of `useLayoutEffect`, and calculating `scrollHeight` requires adding a +2px offset to account for Tailwind's `border-box` layout to prevent persistent scrollbars. Additionally, tracking and restoring `scrollTop` during the height recalculation is critical to prevent scroll jumping when users type quickly.
**Action:** Always use `useEffect` for DOM measurements in Next.js forms, add top/bottom border width to `scrollHeight` for `border-box` elements, and encapsulate scroll preservation logic when building auto-resizing text inputs.
