## 2024-05-25 - Fix form accessibility labeling
**Learning:** Found that custom stylized forms in this repository frequently omit standard `htmlFor` label associations and `aria-label` attributes on single-input forms. Screen readers cannot properly identify these inputs.
**Action:** Always verify that input fields have explicit labels linked via `htmlFor` and `id`, or fallback to `aria-label` if a visual label is absent by design.
