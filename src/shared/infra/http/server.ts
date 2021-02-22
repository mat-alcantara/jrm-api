/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm'; // Import database
import '@shared/containers/index';

const server = express();

// Allow JSON on express
server.use(express.json());

// Activate routes on express
server.use(routes);

// Server will be listened on port 333
server.listen(3333, () => console.log('Server started'));
