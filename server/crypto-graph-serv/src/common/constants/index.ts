import { UserRole } from '../types';
//commented for developing
// require('dotenv/config')
// const {JWT_SECRET_KEY} = process.env

export const APP_ROLES_ALL: UserRole[] = ['user', 'admin'];
const MILLISECONDS_OF_DAY = 86400;
const DAYS_DIAPASON = 7;
export const DATE_NOW_UNIX: number = Math.floor(Date.now() / 1000);
export const SEVEN_DAYS_AGO = DATE_NOW_UNIX - 86400;
