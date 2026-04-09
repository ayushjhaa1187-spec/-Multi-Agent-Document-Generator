export class RateLimiter {
  private requests: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly windowMs: number;
  private readonly limit: number;

  constructor(windowMs: number, limit: number) {
    this.windowMs = windowMs;
    this.limit = limit;
    this.startCleanup();
  }

  check(ip: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(ip);

    if (!entry || now - entry.timestamp > this.windowMs) {
      this.requests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (entry.count >= this.limit) {
      return false;
    }

    entry.count += 1;
    return true;
  }

  private startCleanup() {
    // Cleanup every minute to prevent memory leaks
    if (typeof setInterval !== 'undefined') {
      const interval = setInterval(() => {
        const now = Date.now();
        for (const [ip, entry] of this.requests.entries()) {
          if (now - entry.timestamp > this.windowMs) {
            this.requests.delete(ip);
          }
        }
      }, 60000);
      if (interval.unref) {
        interval.unref();
      }
    }
  }
}

// Global rate limiter instance: 10 requests per minute per IP
export const rateLimiter = new RateLimiter(60000, 10);
