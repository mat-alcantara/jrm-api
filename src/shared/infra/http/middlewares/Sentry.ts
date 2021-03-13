import express from 'express';
import * as Sentry from '@sentry/node';

const app = express();

Sentry.init({
  dsn:
    'https://cde455106fad4b979714f3dc28915142@o337250.ingest.sentry.io/5674274',
  tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
