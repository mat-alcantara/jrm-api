import { createConnection } from 'typeorm';

// This automatically takes ormconfig.json to configure
const server = createConnection();

export default server;
