## 2024-04-19 - React.memo for Message List Components

**Learning:** When using the Vercel AI SDK (`useChat`), the `messages` array is updated frequently during message streaming. This causes the entire message list, including static child components like `CopyButton`, to re-render constantly. Wrapping these static/pure components in `React.memo()` is a critical codebase-specific optimization to prevent layout thrashing and unnecessary CPU work during fast streaming.
**Action:** Always wrap static utility components (like copy buttons, icons, or avatars) inside streamed message lists with `React.memo()` to isolate them from the parent's high-frequency render cycle.
