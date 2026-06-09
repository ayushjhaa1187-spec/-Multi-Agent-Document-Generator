## 2025-02-18 - Optimized Message Re-rendering during Chat Streams

**Learning:** When using the Vercel AI SDK text streaming (`useChat`), any inline mapped items (like `<div key={message.id}>...</div>`) across the `messages` array trigger O(N²) re-renders on every incoming chunk. This causes severe lag during long generation.
**Action:** Always extract items mapped inside streaming contexts into a standalone React component wrapped with `React.memo()`. Define the component outside the parent to ensure only the currently streaming message gets re-rendered. Also, remember to set `.displayName` to prevent ESLint errors.
