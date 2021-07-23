import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  passwordUser: process.env.DB_PASS,
  name: process.env.DB_NAME,
}));
