## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textarea for Chat Input
**Learning:** In Next.js React components, implementing an auto-resizing textarea requires careful handling of scroll positions (`window.scrollY` and `element.scrollTop`) during the height recalculation to prevent jarring scroll jumps. Using `useEffect` over `useLayoutEffect` avoids SSR warnings. Also, handling `Shift+Enter` for newlines and bare `Enter` for submission provides a significantly better UX for multi-line chat inputs.
**Action:** Use a standardized `useEffect` pattern for auto-resizing textareas that caches and restores scroll positions, and ensure `items-end` is used on flex containers alongside textareas to prevent sibling elements from stretching awkwardly.
