## 2026-06-28 - [Remove Error Stack Traces]
**Vulnerability:** Information leakage through stack traces in the analytics error tracking module. The analytics.ts file was capturing full error stack traces and exposing them via the /api/analytics endpoint, which could reveal internal paths and logic.
**Learning:** Error tracking systems that capture and expose full stack traces in analytics responses can inadvertently leak sensitive system information to users or attackers who access those endpoints.
**Prevention:** Never include full stack traces in API responses or generic error tracking systems accessible via endpoints. Only log them internally to secure logging infrastructure.
