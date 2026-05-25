## 2025-05-25 - Prevent O(N²) re-renders in useChat message streams
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, defining the message rendering inline inside the map function causes O(N²) re-renders of the entire message list during text streaming.
**Action:** Extract items rendered within `messages.map()` into standalone components defined outside the parent component, wrap them in `React.memo()`, and explicitly assign a `displayName`. Import the `Message` type directly from the core `ai` package.
