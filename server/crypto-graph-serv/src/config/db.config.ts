import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPasswordUser: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
}));
