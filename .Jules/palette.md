## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-24 - Auto-resizing Textarea UX
**Learning:** For chat interfaces, users frequently need to write multi-line messages, but standard inputs restrict them to a single line. Auto-resizing textareas provide a much better experience but require careful DOM manipulation (like storing `scrollTop` and accounting for borders in `scrollHeight`) to prevent jank and scroll-jumping.
**Action:** Use an auto-resizing `<textarea>` with Enter-to-submit and Shift+Enter-to-newline functionality for any conversational input instead of standard `<input type="text">`.
