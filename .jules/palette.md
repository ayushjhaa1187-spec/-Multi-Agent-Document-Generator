## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-29 - Auto-resizing multiline Chat Textarea
**Learning:** Single-line inputs for complex prompts are frustrating. Users need to type multiple lines for detailed AI requirements, but a fixed textarea wastes space. Auto-resizing textareas provide the best of both worlds. Using `useEffect` to manage `scrollHeight` while preserving `scrollTop` and `window.scrollY` prevents unwanted UI jumping. Handling "Enter" to submit and "Shift+Enter" for new lines provides a familiar chat interface pattern.
**Action:** For chat interfaces requiring complex input, use a `<textarea>` with dynamic height resizing instead of a standard `<input type="text">`. Ensure Enter key triggers form submission without shifting the screen by utilizing `e.currentTarget.form?.requestSubmit()` and keeping track of scroll position.
