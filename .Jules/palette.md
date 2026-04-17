## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Next.js Textareas
**Learning:** When implementing auto-resizing textareas in Next.js React components (especially with Tailwind's box-sizing: border-box), calculating the `scrollHeight` alone can cause persistent scrollbars and scrollbar flickering. Additionally, updating height dynamically without caching the scroll position causes the UI to jump around awkwardly.
**Action:** Always add 2px to the `scrollHeight` calculation to account for top and bottom border widths. Temporarily cache the textarea's `scrollTop` before modifying the height style, and restore it immediately after to prevent layout thrashing and scroll-jumping.
