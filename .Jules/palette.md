## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2025-02-18 - Multiline auto-resizing chat input
**Learning:** When implementing auto-resizing textareas in Next.js/Tailwind for AI chat interfaces, adding exactly 2px to the `scrollHeight` is critical to account for `border-box` top/bottom border widths. Failing to do this causes a persistent scrollbar and subtle scrollbar flickering on every keystroke.
**Action:** Always include the `scrollHeight + 2` calculation and use `useEffect` (not `useLayoutEffect`) with scroll jump prevention (`scrollTop` saving/restoring) when converting single-line inputs to textareas in Next.js React components.
