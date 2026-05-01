## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textareas and Keyboard Accessibility
**Learning:** Replacing an `<input>` with a `<textarea>` to support multi-line chat messages requires a combination of features to maintain a smooth UX: an auto-resize effect (to grow the box seamlessly), a layout fix (`min-w-0`, `resize-none`) to avoid breaking flexbox layout, and explicit form submission logic on `Enter` keystrokes. When submitting via the keyboard, using `e.currentTarget.form?.requestSubmit()` is critical to ensuring the synthetic `onSubmit` handler in React triggers as expected, unlike simpler `dispatchEvent` approaches.
**Action:** When implementing chat boxes, prefer auto-resizing textareas over simple inputs to provide more space for thought, handling multiline via Shift+Enter, and ensure accessible `requestSubmit()` to maintain form flow and screen reader friendliness.
