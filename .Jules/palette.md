## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textareas for Requirement Chat
**Learning:** Using a single-line input for chat interfaces where users describe complex requirements creates friction. Implementing an auto-resizing textarea improves readability, but requires careful handling of scroll-jumping with `useEffect` and IME-aware 'Enter' key submission to maintain accessibility and usability.
**Action:** When a chat interface expects multi-line, detailed prompts, use an auto-resizing textarea rather than a standard text input, ensuring `min-w-0`, `items-end` alignment, and proper `e.nativeEvent.isComposing` checks.
