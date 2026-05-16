## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-24 - Auto-resizing Textareas in Flex Containers
**Learning:** When using an auto-resizing textarea inside a flex layout, applying `items-end` to the container prevents sibling elements (like buttons) from unnaturally stretching vertically.
**Action:** Use `items-end` (or `items-start`) on flex wrappers containing auto-resizing textareas, and apply `min-w-0` with `resize-none` to the textarea.
