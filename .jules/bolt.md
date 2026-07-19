## 2024-05-24 - [Optimize message rendering]
**Learning:** Re-rendering a large list of chat messages on every keystroke in a text input can cause noticeable input lag and CPU spikes, especially when the message list is large.
**Action:** Extract the complex message item UI into its own `React.memo` component, so only the newly added messages or messages that actually change will be re-rendered. The input component's state updates will no longer force a re-render of the entire chat history.
