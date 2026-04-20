## 2024-05-18 - Prevent unnecessary re-renders in useChat streaming
**Learning:** In React chat interfaces using the AI SDK (`useChat`), static or pure list item components inside `messages.map` (e.g., `CopyButton`) re-render unnecessarily on every incoming token update during message streaming, which can degrade typing and streaming performance.
**Action:** Always wrap pure/static child components within the `messages.map` iteration loop with `React.memo()` to prevent unnecessary re-renders when the parent chat state updates frequently.
