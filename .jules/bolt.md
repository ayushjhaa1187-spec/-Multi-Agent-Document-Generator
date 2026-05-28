## 2025-01-20 - Vercel AI SDK Streaming O(N²) Render Bottleneck
**Learning:** Inline mapping of chat messages using the Vercel AI SDK causes O(N²) renders because every incoming text chunk forces the entire list of messages to re-render, even the historical ones.
**Action:** Extract list items mapped over the `messages` array into standalone components wrapped in `React.memo()` (defined outside the parent) to ensure only the actively streaming message re-renders.
