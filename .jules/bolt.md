
## 2024-05-04 - Prevent O(N²) React Renders in Vercel AI SDK
**Learning:** When using the Vercel AI SDK `useChat` hook, the `messages` array is updated frequently during text streaming. Rendering inline elements within `messages.map()` causes React to re-render the entire message list on every stream chunk, leading to an O(N²) rendering bottleneck as the chat history grows.
**Action:** Always extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` to prevent previous messages from re-rendering while the current message streams.
