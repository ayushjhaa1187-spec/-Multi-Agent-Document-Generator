## 2024-05-24 - React.memo for Chat Messages
**Learning:** When using the Vercel AI SDK `useChat` hook, rendering messages inside a `map` can cause O(N²) re-renders during text streaming if the individual message components are not memoized.
**Action:** Always extract message rendering into a standalone component wrapped in `React.memo()` when dealing with streaming text to prevent unnecessary re-renders of the entire message list.
