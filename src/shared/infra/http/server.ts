/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors'; // Dependency needed to catch erros in the application
import * as Sentry from '@sentry/node';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError'; // Import Error instance
import routes from '@shared/infra/http/routes'; // Import all routes

import '@shared/infra/typeorm'; // Import database
import '@shared/containers/index'; // Import dependency injection Containers
import '@shared/infra/http/middlewares/RateLimiter';

Sentry.init({
  dsn:
    'https://cde455106fad4b979714f3dc28915142@o337250.ingest.sentry.io/5674274',
  tracesSampleRate: 1.0,
});

const server = express();

server.use(Sentry.Handlers.requestHandler());
server.use(cors());
server.use(helmet());
server.use(express.json()); // Allow JSON on express
server.use(routes); // Activate routes on express
server.use(Sentry.Handlers.errorHandler());
server.use(errors()); // Celebrate Errors

// Return an error as a instance of AppError
server.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

server.listen(process.env.PORT, () =>
  console.log('⚡️ Server started on port 3333!'),
); // Server will be listened on port 333
