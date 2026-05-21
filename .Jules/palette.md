## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Chat Textarea
**Learning:** Users naturally write multi-line messages when clarifying complex business requirements. Using a single-line input truncates their view and degrades the experience. Adding an auto-resizing textarea with "Enter to submit, Shift+Enter for new line" improves multiline entry while preserving quick submission. Applying `items-end` to the flex container keeps the submit button anchored at the bottom, and `min-w-0` prevents horizontal overflow.
**Action:** When designing conversational AI interfaces for detailed context, default to an auto-resizing textarea over a standard text input, ensuring the adjacent submit button aligns to the bottom (`items-end`) and the textarea prevents overflow (`min-w-0`).
