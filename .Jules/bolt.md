## 2024-05-22 - Extract AI Chat Messages into Memoized Components
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, rendering message lists inline within `messages.map()` causes an O(N²) rendering bottleneck during active text streaming. Each new chunk updates the parent component state, forcing every previously rendered message to completely re-render.
**Action:** Always extract items rendered within `messages.map()` into standalone functional components defined outside the parent, wrap them in `React.memo()`, and explicitly assign a `displayName`.
