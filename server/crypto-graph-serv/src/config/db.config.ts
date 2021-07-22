import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => {

  console.log('--------------------------------------------')
  console.log({
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPasswordUser: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
  })
  console.log('--------------------------------------------')


  return {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPasswordUser: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
}});
