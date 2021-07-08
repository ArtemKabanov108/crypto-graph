import {UserRole} from "../types";
require('dotenv/config')
const {JWT_SECRET_KEY} = process.env

export const APP_ROLES_ALL: UserRole[] = ['student', "teacher", "parent", "admin", "mentor"];
export const jwtConstants = {
    secret: JWT_SECRET_KEY,
};
