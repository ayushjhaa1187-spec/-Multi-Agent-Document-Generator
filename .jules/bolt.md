
## 2024-05-01 - Prevent O(N²) Re-renders during AI Text Streaming
**Learning:** During text streaming with Vercel AI SDK (`useChat`), the `messages` array updates extremely frequently as tokens arrive. Rendering the entire message list inline inside the `map` causes an O(N²) re-render bottleneck, where every previous message is entirely re-rendered for every single token update.
**Action:** Extract list items rendered within `messages.map()` into standalone components wrapped in `React.memo()`. This ensures only the currently streaming message re-renders, while previously completed messages bypass the render cycle.
