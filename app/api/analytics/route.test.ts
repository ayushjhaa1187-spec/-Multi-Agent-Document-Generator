import { describe, it } from "node:test";
import assert from "node:assert";
import { GET } from "./route";
import { analyticsTracker } from "@/lib/analytics";

describe("GET /api/analytics - Security Validation", () => {
  it("should not expose stack traces in recentEvents", async () => {
    // Inject a simulated error event with a stack trace
    const error = new Error("Simulated internal error");
    error.stack =
      "Error: Simulated internal error\n    at Object.<anonymous> (/app/api/route.ts:42:1)";

    analyticsTracker.trackError(error, { endpoint: "/api/test" });

    const req = new Request("http://localhost/api/analytics", {
      method: "GET",
    });

    const res = await GET();
    assert.strictEqual(res.status, 200);

    const data = await res.json();

    // Find the error event we just injected
    const errorEvent = data.recentEvents.find((e: any) => e.event === "error");
    assert.ok(errorEvent, "Error event should be present in recentEvents");

    // Verify that the stack trace property has been removed
    assert.strictEqual(
      errorEvent.properties.stack,
      undefined,
      "Stack trace should be sanitized from properties",
    );
    // Verify that other properties are still present
    assert.strictEqual(errorEvent.properties.error, "Simulated internal error");
    assert.strictEqual(errorEvent.properties.endpoint, "/api/test");
  });
});
