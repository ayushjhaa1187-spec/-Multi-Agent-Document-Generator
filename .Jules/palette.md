## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textarea Input
**Learning:** Using a single-line input for chat interfaces restricts users from pasting or typing multi-line messages, creating a frustrating UX. Converting it to an auto-resizing textarea with specific flexbox alignment (`items-end`) and height management (compensating for border-box widths and scroll jumping) solves this while keeping the UI clean.
**Action:** When building chat interfaces, always use auto-resizing textareas over standard inputs to support rich, multi-line content.
