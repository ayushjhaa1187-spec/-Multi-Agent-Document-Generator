## 2024-08-08 - React.memo for Streaming Chat
**Learning:** In AI chat apps, mapping over a `messages` array inline causes *all* previous messages to re-render constantly when a new message is streaming in.
**Action:** Always extract message rows into a separate component and wrap them in `React.memo()` to cache older messages and only re-render the actively streaming one.
