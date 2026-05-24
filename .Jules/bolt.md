## 2024-05-24 - Optimize Message List Re-renders during Text Streaming
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, mapping over `messages` with inline components causes O(N^2) re-renders during text streaming because every new chunk creates a new message array, forcing all previously rendered messages to re-render.
**Action:** Extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` to ensure only the actively streaming message re-renders.
