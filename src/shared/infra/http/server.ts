/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';
import routes from '@shared/infra/http/routes'; // Import all routes
import { errors } from 'celebrate';

import '@shared/infra/typeorm'; // Import database
import '@shared/containers/index'; // Import dependency injection Containers

const server = express();

// Allow JSON on express
server.use(express.json());

// Activate routes on express
server.use(routes);

// Celebrate Errors
server.use(errors());

// Server will be listened on port 333
server.listen(3333, () => console.log('Server started'));
