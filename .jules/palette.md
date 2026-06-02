## 2024-06-02 - Form Inputs ARIA and Title Labels
**Learning:** Found that `<input>` for message inputs did not have `aria-label`, and the button to send missing `title` which makes disabled states hard for screenreaders to understand. Forms that use `<label>` should have `htmlFor` with their inputs.
**Action:** Always ensure any `<input>` not directly wrapped by `<label>` or explicitly `htmlFor` linked has an `aria-label`. Ensure interactive elements like disabled send buttons have a `title` explaining their state to aid screen readers and provide tooltips.
