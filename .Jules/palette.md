## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textareas in Flex Layouts
**Learning:** When using an auto-resizing `<textarea>` alongside a submit button in a Tailwind `flex` container, the container must use `items-end` (or `items-start`). Otherwise, the sibling button will unintentionally stretch vertically as the textarea expands. Additionally, `min-w-0` and `resize-none` are crucial for proper containment.
**Action:** Always apply alignment classes (`items-end`/`items-start`) to the parent flex container and `min-w-0 resize-none` to the textarea when implementing chat-like auto-resizing inputs.
