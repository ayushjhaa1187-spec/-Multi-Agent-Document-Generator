## 2024-04-27 - Memoize components rendering streamed lists

**Learning:** When using Vercel AI SDK's `useChat` stream functionality, React updates the parent component frequently. If list items inside are not memoized, they will all re-render on every chunk of streamed text, resulting in O(N^2) renders.
**Action:** Always extract items rendered within `messages.map(...)` into standalone components wrapped in `React.memo()` in chat interfaces to avoid O(N^2) re-renders.
