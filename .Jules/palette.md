## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Chat Textarea
**Learning:** Using a single-line input for chat interfaces restricts user expression and readability for long inputs. Replacing it with an auto-resizing `<textarea>` that uses `requestSubmit()` on Enter (while preserving Shift+Enter for newlines and checking `!isComposing` for IME support) creates a much more natural and accessible chat experience. A `setTimeout` is essential when resetting height upon submission to ensure the DOM clears the text before recalibrating.
**Action:** Always use auto-resizing textareas instead of single-line inputs for conversational UI components, and handle the Shift+Enter pattern explicitly.
