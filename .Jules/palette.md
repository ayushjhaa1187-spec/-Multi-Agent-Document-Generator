## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-03-16 - Auto-resizing Textareas in Chat UI
**Learning:** Using an auto-resizing `<textarea>` instead of a single-line `<input>` is critical for chat interfaces where users provide detailed requirements, preventing the text from scrolling horizontally out of view. For resetting the height upon submission, deferring the `height = 'auto'` action via `setTimeout` is essential to let the React DOM correctly clear the value first.
**Action:** When creating text inputs for multi-sentence tasks, use an auto-resizing textarea with `max-h` limits, manual 'Enter' submission (handling IME with `!e.nativeEvent.isComposing`), and deferred height reset.
