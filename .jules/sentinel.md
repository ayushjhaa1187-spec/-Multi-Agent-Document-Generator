## 2026-08-09 - Fix weak session ID generation
**Vulnerability:** Weak PRNG (`Math.random()`) was used to generate session IDs in `lib/analytics.ts`.
**Learning:** Using `Math.random()` for generating session IDs or tokens is cryptographically weak and predictable (CWE-338), which can lead to session hijacking.
**Prevention:** Always use cryptographically secure random number generators like `crypto.randomUUID()` or `crypto.getRandomValues()` for sensitive identifiers like session IDs or tokens.
