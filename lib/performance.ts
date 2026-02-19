/**
 * Performance monitoring utilities for tracking API response times
 */

interface PerformanceMetrics {
  endpoint: string;
  duration: number;
  timestamp: Date;
  status: number;
}

const metrics: PerformanceMetrics[] = [];
const PERFORMANCE_THRESHOLD = 500; // milliseconds

/**
 * Record API response time
 */
export function recordMetric(
  endpoint: string,
  duration: number,
  status: number
): void {
  const metric: PerformanceMetrics = {
    endpoint,
    duration,
    status,
    timestamp: new Date(),
  };

  metrics.push(metric);

  // Keep only last 100 metrics in memory
  if (metrics.length > 100) {
    metrics.shift();
  }

  // Log if response time exceeds threshold
  if (duration > PERFORMANCE_THRESHOLD) {
    console.warn(
      `[PERFORMANCE] ${endpoint} took ${duration}ms (threshold: ${PERFORMANCE_THRESHOLD}ms)`
    );
  }
}

/**
 * Get average response time for an endpoint
 */
export function getAverageResponseTime(endpoint: string): number {
  const endpointMetrics = metrics.filter((m) => m.endpoint === endpoint);
  if (endpointMetrics.length === 0) return 0;

  const sum = endpointMetrics.reduce((acc, m) => acc + m.duration, 0);
  return Math.round(sum / endpointMetrics.length);
}

/**
 * Get all recorded metrics
 */
export function getAllMetrics(): PerformanceMetrics[] {
  return [...metrics];
}

/**
 * Create a performance monitoring wrapper for async functions
 */
export async function withPerformanceTracking<T>(
  endpoint: string,
  fn: () => Promise<{ response: T; status: number }>
): Promise<T> {
  const startTime = Date.now();
  try {
    const { response, status } = await fn();
    const duration = Date.now() - startTime;
    recordMetric(endpoint, duration, status);
    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    recordMetric(endpoint, duration, 500);
    throw error;
  }
}
