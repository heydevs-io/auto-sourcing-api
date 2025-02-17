import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

// * Database
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;

// * App
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;

// * JWT
export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;
export const JWT_RESET_PASSWORD_KEY = process.env.JWT_RESET_PASSWORD_KEY;

// * Supabase
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// * Redis
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT!);

// * Parser API
export const PARSER_API_URL = process.env.PARSER_API_URL;

// * Cloud Storage
export const CLOUD_LOCAL = process.env.CLOUD_LOCAL || true;
export const CLOUD_STORAGE_PUBLIC_URL = process.env.CLOUD_STORAGE_PUBLIC_URL;

// * AWS S3
export const AWS_S3_REGION = process.env.AWS_S3_REGION;
export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
export const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

// * OTP
export const DEFAULT_OTP = process.env.DEFAULT_OTP || '111111';
