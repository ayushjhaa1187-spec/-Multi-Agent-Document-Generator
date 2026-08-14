## 2026-08-14 - Memoize Chat Messages
**Learning:** The chat interface rerenders all messages whenever a new message streams in, causing unnecessary work.
**Action:** Extract inline message rendering logic in `messages.map` into a separate component and wrap it in `memo` so each message only renders once.
