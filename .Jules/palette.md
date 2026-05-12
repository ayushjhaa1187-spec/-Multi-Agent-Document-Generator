## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-05-12 - Auto-resizing Textareas in Flex Layouts
**Learning:** When using an auto-resizing textarea as a flex child inside a Tailwind flex container with other interactive elements (like a submit button), applying `items-end` to the parent flex row prevents sibling elements from unintentionally stretching vertically as the textarea expands. Additionally, using `min-w-0` and `resize-none` is crucial.
**Action:** Always apply `items-end` or `items-start` to flex row containers housing auto-resizing textareas and submit buttons, and use `min-w-0` on the textarea.
