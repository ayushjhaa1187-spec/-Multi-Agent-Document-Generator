## 2024-05-18 - Memoize Chat Messages in Vercel AI SDK useChat
**Learning:** When using Vercel AI SDK's `useChat` hook, items rendered within `messages.map()` cause O(N²) re-renders of the entire message list during text streaming.
**Action:** Extract list items into standalone components wrapped in `React.memo()` to prevent these costly, repeated renders. Always place the extracted component outside the parent component's body.
