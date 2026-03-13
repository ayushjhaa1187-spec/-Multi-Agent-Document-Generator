## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textareas
**Learning:** AI chat interfaces benefit greatly from auto-resizing textareas instead of single-line inputs to support multi-line prompts. Key UX details include preserving 'Shift+Enter' for newlines, checking `!e.nativeEvent.isComposing` to support IMEs during 'Enter' submission, and deferring height resets with `setTimeout` after form submission to ensure the DOM updates correctly.
**Action:** When implementing chat inputs, use an auto-resizing `<textarea>` with `overflow-y-auto`, manual Enter key submission handling (with IME support), and appropriate `aria-label` attributes for accessibility.
