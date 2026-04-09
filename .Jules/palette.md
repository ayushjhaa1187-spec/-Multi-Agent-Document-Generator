## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Multiline Chat Inputs
**Learning:** AI chat interfaces often require users to input long, complex prompts or implementation details. Restricting this to a single-line `<input>` is a severe UX bottleneck. Using an auto-resizing `<textarea>` provides the necessary space. Additionally, correctly handling the `Enter` key (checking `!e.nativeEvent.isComposing`) is critical for IME (Input Method Editor) compatibility, ensuring users composing non-Latin characters don't accidentally submit their incomplete queries.
**Action:** For all AI chat inputs, use auto-resizing `<textarea>` elements, support multiline input (e.g., via Shift+Enter), and explicitly handle IME composition states during form submission.
