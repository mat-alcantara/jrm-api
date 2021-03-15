import { createConnection } from 'typeorm';
import 'dotenv/config';

// This automatically takes ormconfig.json to configure
const server = createConnection();

export default server;
