## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textareas in Flex Layouts
**Learning:** When using an auto-resizing textarea as a chat input inside a flex row alongside a submit button, the button might stretch vertically as the textarea expands unless the flex container has alignment classes like `items-end` or `items-start`. Also, `min-w-0` is needed to prevent the textarea from overflowing its flex container.
**Action:** Always use `items-end` on the flex container when pairing auto-resizing textareas with buttons, and apply `min-w-0` and `resize-none` to the textarea.
