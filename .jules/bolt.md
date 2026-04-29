## 2025-04-29 - Memoizing Streaming UI Chat Messages
**Learning:** During chat UI text streaming, components using Vercel AI SDK's `useChat` experience O(N²) re-renders when rendering an inline list of messages without memoization, as every stream token re-evaluates the entire array.
**Action:** Always extract individual list items inside streaming map loops (e.g. `messages.map()`) into standalone components wrapped in `React.memo()`. This leverages the immutable updates of `useChat` to ensure only the currently streaming message re-renders, making performance O(N) instead.
