require('dotenv/config');

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${rootDir}/modules/**/infra/typeorm/entities/*.ts`],
  migrations: [`${rootDir}/shared/infra/typeorm/migrations/*.ts`],
  cli: {
    entitiesDir: 'src/modules/**/infra/typeorm/entities',
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};
