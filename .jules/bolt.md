## 2024-06-01 - React.memo Optimization for AI Streaming
**Learning:** Vercel AI SDK text streaming causes the parent component to re-render on every chunk. If chat messages are mapped inline, all previous messages are completely re-rendered O(N²) times during a stream.
**Action:** Extract inline mapped messages into a standalone component wrapped in `React.memo` (defined outside the parent body) to ensure only the actively streaming message re-renders. Use inline type definitions if type imports fail.
