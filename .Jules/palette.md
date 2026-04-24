## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-24 - Auto-resizing Textarea for Chat Input
**Learning:** Using an auto-resizing textarea for chat interfaces, while accounting for borders (`scrollHeight + 2px`) and preserving `scrollTop`, prevents scroll-jumping and provides a better multi-line typing experience. Safely handling `Enter` submission via `requestSubmit()` and accommodating IMEs (`!e.nativeEvent.isComposing`) is crucial for a complete UX.
**Action:** Implement auto-resizing textareas with explicit keyboard and IME handling for all chat inputs.
