import * as Sentry from '@sentry/node';

export const sentry: any = Sentry.init({
  dsn: process.env.SENTRY_DNS,
  // Add any additional configuration options here
});


