## 2024-05-15 - Memoize Vercel AI SDK Chat Messages
**Learning:** During text streaming with the Vercel AI SDK, `useChat` triggers frequent re-renders of the entire message list, causing O(N²) rendering complexity if individual messages are not memoized.
**Action:** Extract inline message rendering inside `messages.map` into a standalone component wrapped in `React.memo()` with a properly assigned `displayName`.
