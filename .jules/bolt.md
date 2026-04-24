
## 2024-04-24 - AI Streaming Chat Performance Anti-Pattern
**Learning:** During streaming updates in React (`useChat`), any child component mapped within the messages list (like utility buttons or static UI) will aggressively re-render every time the stream appends a new token unless explicitly memoized. This can cause severe CPU overhead on long chat threads.
**Action:** Always wrap static or pure list item components inside `messages.map` (e.g., `CopyButton`) with `React.memo()` in AI chat interfaces to decouple their render cycle from the parent's high-frequency streaming updates.
