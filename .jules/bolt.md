## 2024-06-19 - React.memo for Chat Streaming Components
**Learning:** In LLM chat interfaces where new text streams in or inputs frequently change, inline mapping of anonymous chat message components causes continuous, expensive re-renders of the entire message history DOM tree.
**Action:** Extract large list items (like chat messages) into independent, `React.memo()` wrapped components with strict, simple props so that only the actively streaming/changing components are re-evaluated by the virtual DOM.
