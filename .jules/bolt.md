## 2026-08-09 - Memoizing Chat Messages
**Learning:** In a chat interface with a streaming response (like `useChat`), the entire message list re-renders constantly as new chunks arrive or when the user types in the input field.
**Action:** Extract the individual message rendering into a separate component and wrap it in `React.memo()`. This prevents older messages from re-rendering on every keystroke or new message chunk, significantly reducing React rendering overhead.
