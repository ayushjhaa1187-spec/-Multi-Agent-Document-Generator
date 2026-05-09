## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Chat Textarea
**Learning:** When styling auto-resizing textareas as flex children in Tailwind layouts, adding `min-w-0` prevents horizontal overflow, and using `items-end` on the flex container prevents sibling elements from unintentionally stretching vertically as the textarea expands.
**Action:** Use `min-w-0`, `resize-none`, and `items-end` on the parent container when implementing auto-resizing textareas alongside interactive elements like submit buttons.
