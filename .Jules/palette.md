## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Form Inputs vs. Placeholder Labels
**Learning:** Depending entirely on placeholders for input context (like the chat input missing an `aria-label`) severely diminishes screen reader functionality, as placeholders disappear once text is typed. Using a dynamic `aria-label` depending on UI state resolves this cleanly.
**Action:** Always provide `aria-label` attributes to dynamic input fields when visible text labels (`<label>`) aren't practical due to design constraints.
