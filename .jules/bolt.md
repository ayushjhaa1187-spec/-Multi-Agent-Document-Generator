## 2026-04-14 - Memoizing pure components in AI chat interfaces
**Learning:** During AI message streaming with the Vercel AI SDK (`useChat`), pure static or pure list components (like `CopyButton`) mapped over the streaming `messages` array re-render rapidly on every chunk, wasting CPU cycles unnecessarily.
**Action:** Always wrap static/pure list item components nested inside streaming message lists (e.g., `messages.map`) with `React.memo()` to block these re-renders and preserve frontend performance during stream.
