## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textarea for Chat
**Learning:** Using an auto-resizing textarea in chat interfaces improves the UX for long messages without taking up too much vertical space initially. Utilizing `requestSubmit` allows sending messages via Enter key seamlessly while keeping `min-w-0` and `resize-none` avoids overflowing the flex layout. Supporting IME requires checking `!e.nativeEvent.isComposing`.
**Action:** Use a textarea with dynamic height calculation on input change, allow 'Enter' to submit the form but guard against IME composition events.
