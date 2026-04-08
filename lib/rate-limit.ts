/**
 * Rate Limiter utility
 * Implements a simple sliding window algorithm using in-memory storage.
 */

interface RateLimitOptions {
  interval?: number; // Time window in milliseconds (default: 60000ms = 1 minute)
}

export class RateLimiter {
  private tokens: Map<string, number[]>;
  private interval: number;

  constructor(options?: RateLimitOptions) {
    this.tokens = new Map();
    this.interval = options?.interval || 60000;
    // Cleanup every 5 minutes (300000 ms)
    setInterval(() => this.cleanup(), 300000).unref();
  }

  /**
   * Check if a token has exceeded the rate limit
   * @param limit Max number of requests allowed in the interval
   * @param token Unique identifier (e.g., IP address)
   * @returns Promise that resolves if allowed, rejects if limit exceeded
   */
  check(limit: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const tokenTimestamps = this.tokens.get(token) || [];

      // Filter out timestamps outside the current window
      const validTimestamps = tokenTimestamps.filter(
        (timestamp) => now - timestamp < this.interval
      );

      if (validTimestamps.length >= limit) {
        return reject(new Error('Rate limit exceeded'));
      }

      validTimestamps.push(now);
      this.tokens.set(token, validTimestamps);
      resolve();
    });
  }

  /**
   * Remove expired tokens to prevent memory leaks
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, timestamps] of this.tokens.entries()) {
      const validTimestamps = timestamps.filter(
        (timestamp) => now - timestamp < this.interval
      );

      if (validTimestamps.length === 0) {
        this.tokens.delete(key);
      } else {
        this.tokens.set(key, validTimestamps);
      }
    }
  }
}

// Singleton instance with 1 minute interval
export const rateLimiter = new RateLimiter({
  interval: 60 * 1000,
});
