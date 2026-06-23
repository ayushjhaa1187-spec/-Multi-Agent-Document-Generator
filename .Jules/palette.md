## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-23 - Dynamic Interaction Accessibility
**Learning:** Dynamically rendered interaction buttons (like "Stop generating" during loading states) often miss keyboard focus rings and `aria-label`s, creating a gap for screen readers and keyboard users who cannot easily target ephemeral elements.
**Action:** Always include `focus-visible` ring styles and descriptive `aria-label`s for interactive elements that appear dynamically during asynchronous actions.
