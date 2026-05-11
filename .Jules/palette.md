## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-11 - Auto-Resizing Textarea for Chat Input
**Learning:** When using an auto-resizing textarea in a flex layout, adding `min-w-0` to the textarea and `items-end` to the flex container ensures smooth expansion without breaking horizontal layouts or unintentionally stretching adjacent elements.
**Action:** Always wrap chat input textareas in a flex container with appropriate alignment classes and manage resize state carefully to prevent scroll jumping.
