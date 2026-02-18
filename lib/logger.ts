export function logError(context: string, error: unknown) {
  const sanitized = sanitizeError(error);
  console.error(context, JSON.stringify(sanitized, null, 2));
}

export function sanitizeError(error: unknown): unknown {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      cause: (error as any).cause ? sanitizeError((error as any).cause) : undefined,
    };
  }

  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.parse(JSON.stringify(error, (key, value) => {
        if (key.match(/password|secret|token|key|authorization|cookie|auth/i)) {
          return '***REDACTED***';
        }
        return value;
      }));
    } catch (e) {
      return '[Unable to sanitize object: ' + (e instanceof Error ? e.message : String(e)) + ']';
    }
  }

  return error;
}
