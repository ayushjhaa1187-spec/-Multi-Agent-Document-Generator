## 2024-07-08 - Adding explicit labels to chat inputs

**Learning:** Chat interfaces with dynamically appearing inputs (like the chat input form that appears after selecting a project) often lack proper `aria-label` or explicit `<label>` elements linked via `id` to the input. This makes them inaccessible to screen readers. Specifically, the chat input lacked any label, while the project name input had a visible text label but wasn't programmatically linked using `htmlFor`.

**Action:** When working on inputs, especially those added dynamically or after a state change, always ensure that either an explicit visible label with `htmlFor` matching the input's `id` is present, or if visually undesirable, an `.sr-only` class is applied to the label. This ensures that screen readers can correctly identify the input's purpose.
