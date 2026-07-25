## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Comprehensive Keyboard Navigation Focus
**Learning:** While visual hover states are common, missing focus rings make keyboard navigation invisible. Tailwind's `focus-visible:` utility applies focus rings ONLY when users navigate via keyboard (avoiding ugly rings on mouse click). Applying this to all interactive elements drastically improves accessibility for power users and those with motor disabilities.
**Action:** Always add explicit `focus-visible:ring-2 focus-visible:ring-[color] outline-none` to buttons and interactive elements, ensuring keyboard users have clear visual indicators of their current position.
