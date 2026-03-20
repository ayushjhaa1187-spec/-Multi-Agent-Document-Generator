## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textarea Reset
**Learning:** When building an auto-resizing textarea that submits on `Enter`, resetting the height directly in the `onSubmit` handler will fail because the DOM hasn't updated the value to empty yet. Wrapping the reset in a `setTimeout(() => ..., 0)` defers the execution until after the React render cycle completes and the value is actually cleared.
**Action:** When implementing auto-resizing textareas in React, always defer the height reset upon form submission using `setTimeout` to ensure the DOM has updated before recalculating the height.
