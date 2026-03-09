## 2024-05-14 - Auto-resizing multiline chat inputs

**Learning:** When changing standard single-line `<input>`s to `<textarea>`s to support multiline pasting and entry in React apps, styling with `overflow-y-auto` and static min/max heights is insufficient to create a true "expanding box" experience. Without programmatic resizing, the textarea stays small and forces internal scrolling, which degrades the UX.

**Action:** Always implement a small `onInput` / `onChange` handler that recalculates and updates `e.target.style.height = e.target.scrollHeight + 'px'` dynamically. Additionally, ensure the height is reset to 'auto' upon submission (e.g. inside `setTimeout` when hitting Enter) so the box shrinks back down when the user sends a message.