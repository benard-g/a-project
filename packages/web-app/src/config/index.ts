export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
} as const;
