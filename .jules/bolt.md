## 2024-05-10 - Vercel AI SDK Streaming Performance
**Learning:** During text streaming with Vercel AI SDK's `useChat`, the entire message list re-renders on every chunk update, causing O(N²) rendering complexity as the chat grows.
**Action:** Always extract individual message items rendered within `messages.map()` into standalone components wrapped in `React.memo()` with a properly assigned `displayName` to prevent massive re-rendering overhead.
