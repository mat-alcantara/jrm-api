/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from '@shared/infra/http/routes';

const server = express();

// Activate routes on express
server.use(routes);

// Server will be listened on port 333
server.listen(3333, () => console.log('Server started'));
