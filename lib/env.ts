export function validateEnv() {
  const required = ['OPENAI_API_KEY', 'DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

export const ENV = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
