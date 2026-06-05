## 2024-05-18 - React.memo for Streaming Chat Messages
**Learning:** When using Vercel AI SDK text streaming (`useChat`), inline components mapped over the `messages` array trigger O(N²) re-renders on every chunk as the parent component state updates for each new character. This leads to severe CPU thrashing on long chats.
**Action:** Extract the inline message rendering logic into a standalone component outside the parent and wrap it in `React.memo()`. This ensures that only the actively streaming message re-renders, protecting historical messages from unnecessary updates.
