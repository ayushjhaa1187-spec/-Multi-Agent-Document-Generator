## 2024-05-19 - Vercel AI SDK O(N²) Re-render Bottleneck
**Learning:** Rendering items in a Vercel AI SDK useChat messages.map() directly inside the main component body causes O(N²) re-renders of the entire message list on every streaming chunk, actively degrading performance.
**Action:** Extract list items into standalone components defined outside the parent component's body and wrapped in React.memo() with a displayName. This reduces operations from O(N²) to O(1) for previously rendered messages.
