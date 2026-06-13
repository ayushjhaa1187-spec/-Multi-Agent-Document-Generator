## 2024-06-13 - Streaming UI Re-render Optimization
**Learning:** When using Vercel AI SDK text streaming, mapping over the messages array with inline components causes O(N²) re-renders on every chunk.
**Action:** Extract list items into standalone components wrapped in React.memo() outside the parent to ensure only the actively streaming message re-renders.
