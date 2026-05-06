## 2024-05-06 - Memoize chat messages to prevent O(N²) re-renders
**Learning:** During LLM response streaming in `useChat`, Next.js/React re-renders the entire message list whenever the input or new tokens stream in, resulting in O(N²) renders.
**Action:** Extract list items rendered within `messages.map()` into standalone components and wrap them in `React.memo()` to skip re-rendering completed messages.
