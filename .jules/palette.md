## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-23 - Focus States for Dynamic Controls
**Learning:** Adding explicit `focus-visible` styles to dynamic secondary controls like "Stop generation" and "Change project" significantly improves keyboard navigation, making it clear which elements are interactive when tabbing through. Adding `id`/`htmlFor` associations and `aria-label`s to dynamic form inputs also improves screen reader support.
**Action:** For all interactive elements and inputs, ensure explicit `focus-visible` styles and proper HTML/ARIA associations are used.
