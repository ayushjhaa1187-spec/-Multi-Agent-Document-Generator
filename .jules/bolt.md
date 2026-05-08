## 2024-05-08 - O(N²) Re-renders in useChat message list
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, rendering message lists inline causes O(N²) re-renders of the entire message list during text streaming. As the response streams, `messages` array changes on every chunk, re-rendering all previous messages.
**Action:** Always extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` with explicitly assigned `displayName` to prevent Next.js ESLint `react/display-name` errors.
