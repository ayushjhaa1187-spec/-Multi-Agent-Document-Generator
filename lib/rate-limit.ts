export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Run cleanup every minute
    this.cleanupInterval = setInterval(() => {
      this.prune();
    }, 60 * 1000);

    // Unref the interval so it doesn't block the process from exiting (e.g. in tests)
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check if a request is allowed for the given IP within the window.
   * @param ip The IP address to check.
   * @param limit The maximum number of requests allowed.
   * @param windowMs The time window in milliseconds.
   * @returns { success: boolean, remaining: number, reset: number }
   */
  public check(ip: string, limit: number, windowMs: number): { success: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const record = this.requests.get(ip);

    if (!record) {
      const resetTime = now + windowMs;
      this.requests.set(ip, { count: 1, resetTime });
      return { success: true, remaining: limit - 1, reset: resetTime };
    }

    if (now > record.resetTime) {
      // Window expired, reset count
      const resetTime = now + windowMs;
      this.requests.set(ip, { count: 1, resetTime });
      return { success: true, remaining: limit - 1, reset: resetTime };
    }

    if (record.count >= limit) {
      // Limit exceeded
      return { success: false, remaining: 0, reset: record.resetTime };
    }

    // Increment count
    record.count += 1;
    this.requests.set(ip, record);
    return { success: true, remaining: limit - record.count, reset: record.resetTime };
  }

  /**
   * Remove expired entries from the map.
   */
  private prune(): void {
    const now = Date.now();
    for (const [ip, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(ip);
      }
    }
  }

  /**
   * Manually stop the cleanup interval (useful for tests).
   */
  public stop(): void {
    clearInterval(this.cleanupInterval);
  }
}

export const rateLimiter = new RateLimiter();
