## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-12 - Critical State Actions & Alerts
**Learning:** Destructive or state-resetting UI actions (like clearing chat history) can be easily triggered by accident without a confirmation mechanism. Wrapping these with native browser `window.confirm` dialogues is a quick and effective way to preserve user context. Additionally, dynamic error message components should immediately announce feedback to screen readers using `role="alert"` and `aria-live="assertive"`.
**Action:** When adding destructive or state-resetting interactions to the UI, ensure they are wrapped in a confirmation prompt. Any dynamic error feedback shown on the screen must also be explicitly set with ARIA alert roles.
