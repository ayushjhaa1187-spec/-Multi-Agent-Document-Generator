## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textarea
**Learning:** Using an auto-resizing textarea for chat interfaces significantly improves the user experience when writing multi-line prompts, avoiding the constraint of a single-line input. It's critical to manage the height using `scrollHeight` and carefully handle Next.js SSR and layout thrashing.
**Action:** For chat or message inputs, implement auto-resizing textareas that support Shift+Enter for newlines and submit on Enter.
