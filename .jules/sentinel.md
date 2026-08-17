## 2026-08-17 - Add Rate Limiting to Chat API
**Vulnerability:** The `/api/chat` endpoint (which invokes external LLMs and databases) lacked rate limiting, exposing the application to DoS attacks and potential API cost exhaustion.
**Learning:** API routes performing expensive operations must enforce rate limiting at the application level to defend against abuse and unauthenticated floods.
**Prevention:** Always implement a rate-limiting layer (e.g., using a memory cache, Redis, or middleware) on critical and external-facing endpoints that incur compute or financial costs.
