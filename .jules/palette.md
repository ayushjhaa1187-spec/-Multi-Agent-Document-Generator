## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-07-07 - Screen Reader Aria Label
**Learning:** Adding `aria-label` directly on interactive text input elements allows screen readers to confidently read out what information the user needs to provide without needing an attached label element.
**Action:** Use `aria-label` for screen readers in conjunction with input fields where visual labels are omitted or contextually grouped for an important accessibility improvement.
