## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-08 - Added accessible tooltips
**Learning:** Some elements like "Change Project" do not have aria-labels or aria-describedby for accessibility. Also missing focus states for keyboard navigation.
**Action:** Identify all icon-only buttons or ambiguous action buttons and ensure they have a descriptive aria-label, especially ones like "Stop" which do not have much context natively. Add focus states for keyboard users.
