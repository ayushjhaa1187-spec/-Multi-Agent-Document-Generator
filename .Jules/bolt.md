## 2024-05-23 - Memoizing Chat List Components
**Learning:** In streaming chat interfaces using `useChat` from AI SDK, mapping over the `messages` array causes frequent re-renders of all list items on every input keystroke or streamed token. Pure static components inside the list (like `CopyButton`) can cause noticeable performance overhead if not memoized.
**Action:** Always wrap static/pure list item components inside `messages.map` (e.g., `CopyButton`) with `React.memo()` to prevent unnecessary re-renders during typing and message streaming.
