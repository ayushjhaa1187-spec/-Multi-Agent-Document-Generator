## 2024-05-24 - React.memo on Static List Items in Streaming Chats
**Learning:** In React chat interfaces using the AI SDK (`useChat`), static or pure list item components like `CopyButton` inside `messages.map` will re-render unnecessarily on every keystroke during typing and continuously during message streaming because the parent component's state updates frequently.
**Action:** Wrap such components with `React.memo()` to prevent unnecessary re-renders during text generation. Added `// ⚡ Bolt Optimization:` comment as required.
