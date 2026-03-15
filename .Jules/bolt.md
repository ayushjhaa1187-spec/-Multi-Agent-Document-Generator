## 2024-03-15 - React Memoization Learning
**Learning:** In React chat interfaces using the AI SDK (`useChat`), wrap static or pure list item components inside `messages.map` (e.g., `CopyButton`) with `React.memo()` to prevent unnecessary re-renders during typing and message streaming.
**Action:** Apply `React.memo()` to pure components rendered inside the `messages.map` array to optimize rendering performance when new messages stream in or users type.
