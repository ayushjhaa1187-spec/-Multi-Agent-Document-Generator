## 2024-06-08 - Optimize Message Map Re-renders
**Learning:** In the Vercel AI SDK chat interface, inline components mapped over the `messages` array trigger O(N²) re-renders on every chunk during text streaming.
**Action:** Extract inline chat message items into standalone components wrapped in `React.memo()` (defined outside the parent component) and ensure they have a `displayName` set to optimize rendering performance during streaming and pass linting.
