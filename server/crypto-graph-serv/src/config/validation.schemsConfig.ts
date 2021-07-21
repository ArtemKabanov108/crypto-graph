import { object, string, number } from 'joi';
/**
 * Envs validation schema
 * @returns object typeof @hapi/joi object
 */
export const createValidationSchema = () =>
  object({
    PORT: number().required(),
    JWT_SECRET: string().required(),
    DB_USER: string().required(),
    DB_PASS: string().required(),
    DB_NAME: string().required(),
    DB_HOST: string().required(),
  });
