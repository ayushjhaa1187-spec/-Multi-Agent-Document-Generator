## 2024-05-14 - React re-renders in AI SDK stream
**Learning:** When using the Vercel AI SDK's `useChat`, streaming responses cause high-frequency state updates to the `messages` array. This triggers unnecessary re-renders for all list children (like message bubbles and copy buttons) for every incoming text chunk, blocking the main thread.
**Action:** Always wrap static or pure list item components inside `messages.map` (e.g., `CopyButton`) with `React.memo()` to prevent unnecessary re-renders during typing and message streaming.
