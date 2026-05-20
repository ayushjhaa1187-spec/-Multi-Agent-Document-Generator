## 2024-05-24 - Vercel AI SDK useChat Re-render Bottleneck
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, mapping over messages directly within the main component body causes O(N^2) re-renders during text streaming, as every token update forces the entire message list to re-render.
**Action:** Always extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()`, and ensure they are defined outside the parent component's body.
