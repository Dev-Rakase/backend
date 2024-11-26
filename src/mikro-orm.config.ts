import { defineConfig } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import 'dotenv/config';

export default defineConfig({
  host: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_NAME, 10) || 5432,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    generator: TSMigrationGenerator,
  },
  driver: PostgreSqlDriver,
});
