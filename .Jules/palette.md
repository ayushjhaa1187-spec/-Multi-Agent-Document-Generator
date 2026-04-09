## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-20 - Multi-line Input for Complex Requirements
**Learning:** Replacing single-line inputs with textareas for complex data entry (like business requirements) significantly improves usability. Users need visual space to compose thoughts, and `Enter` to submit (without Shift) maintains the chat-like expectation while allowing for richer content.
**Action:** Use auto-expanding textareas instead of inputs for any field expected to contain more than one sentence.
