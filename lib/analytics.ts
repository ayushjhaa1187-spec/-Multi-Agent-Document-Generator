/**
 * Analytics tracking utility for user events and application metrics
 */

interface AnalyticsEvent {
  event: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  properties?: Record<string, any>;
}

interface AnalyticsMetrics {
  totalEvents: number;
  eventsByType: Record<string, number>;
  averageResponseTime: number;
  errorRate: number;
}

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private readonly MAX_EVENTS = 1000;
  private errorCount = 0;
  private totalRequests = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startSession();
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track an event
   */
  trackEvent(
    event: string,
    properties?: Record<string, any>,
    userId?: string
  ): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date(),
      userId,
      sessionId: this.sessionId,
      properties,
    };

    this.events.push(analyticsEvent);

    // Keep only last 1000 events in memory
    if (this.events.length > this.MAX_EVENTS) {
      this.events.shift();
    }

    // Log significant events
    if (event === 'error' || event === 'api_error') {
      this.errorCount++;
    }
    this.totalRequests++;

    console.log(`[Analytics] Event tracked: ${event}`, properties);
  }

  /**
   * Track API request
   */
  trackApiRequest(
    endpoint: string,
    duration: number,
    status: number,
    error?: string
  ): void {
    this.trackEvent('api_request', {
      endpoint,
      duration,
      status,
      error,
    });
  }

  /**
   * Track page view
   */
  trackPageView(page: string, properties?: Record<string, any>): void {
    this.trackEvent('page_view', {
      page,
      ...properties,
    });
  }

  /**
   * Track user action
   */
  trackUserAction(action: string, properties?: Record<string, any>): void {
    this.trackEvent('user_action', {
      action,
      ...properties,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error | string, context?: Record<string, any>): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.trackEvent('error', {
      error: errorMessage,
      // Security: Do not include stack trace to avoid exposing sensitive internal paths
      ...context,
    });
  }

  /**
   * Get analytics metrics
   */
  getMetrics(): AnalyticsMetrics {
    const eventsByType: Record<string, number> = {};

    for (const event of this.events) {
      eventsByType[event.event] = (eventsByType[event.event] || 0) + 1;
    }

    return {
      totalEvents: this.events.length,
      eventsByType,
      averageResponseTime: 0, // Would be calculated from api_request events
      errorRate:
        this.totalRequests > 0 ? (this.errorCount / this.totalRequests) * 100 : 0,
    };
  }

  /**
   * Get events for export
   */
  getEvents(limit: number = 100) {
    return this.events.slice(-limit);
  }

  /**
   * Get session info
   */
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      startTime: this.events[0]?.timestamp,
      endTime: this.events[this.events.length - 1]?.timestamp,
      totalEvents: this.events.length,
      metrics: this.getMetrics(),
    };
  }

  /**
   * Start session (can be used to send initial tracking data)
   */
  private startSession(): void {
    console.log(`[Analytics] Session started: ${this.sessionId}`);
    this.trackEvent('session_start', {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });
  }

  /**
   * End session (should be called on cleanup)
   */
  endSession(): void {
    this.trackEvent('session_end', {
      duration: this.getDuration(),
    });
    console.log(`[Analytics] Session ended: ${this.sessionId}`);
  }

  /**
   * Get session duration in milliseconds
   */
  private getDuration(): number {
    if (this.events.length < 2) return 0;

    const start = this.events[0].timestamp;
    const end = this.events[this.events.length - 1].timestamp;

    return end.getTime() - start.getTime();
  }
}

// Singleton instance
export const analyticsTracker = new AnalyticsTracker();
