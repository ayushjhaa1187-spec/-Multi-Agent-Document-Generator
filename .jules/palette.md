## 2024-11-20 - [Add missing labels for screen readers]
**Learning:** React elements without labels or connected to input controls via htmlFor/id make them inaccessible to screen readers.
**Action:** Added `htmlFor` and `id` to the Project Name input, and an `aria-label` to the main chat message input in BRDGenerator component to improve a11y.
