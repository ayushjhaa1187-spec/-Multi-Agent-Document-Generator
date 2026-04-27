## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-11-20 - Auto-Resizing Textarea with Keyboard Submission
**Learning:** For chat interfaces, replacing single-line inputs with auto-resizing textareas drastically improves the UX for multi-line prompts. Combining `Shift+Enter` for newlines and `Enter` for submission (using `e.currentTarget.form?.requestSubmit()`) creates a native-feeling chat experience. Using `useEffect` to safely handle the DOM resizing (`scrollHeight`) prevents SSR hydration mismatches.
**Action:** Default to auto-resizing textareas for any chat or prompt-based input, ensuring keyboard a11y supports natural typing flow.
