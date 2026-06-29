## 2024-06-03 - [Missing Labels on Forms]
**Learning:** Found that there is a missing `id` on an input which means the label is orphaned, not connected to the `input` by `htmlFor`. Found a missing label for a chat input as well.
**Action:** Use existing ARIA attributes or standard `htmlFor` / `id` combinations to make sure all inputs are properly labeled, specifically in `app/page.tsx`.
