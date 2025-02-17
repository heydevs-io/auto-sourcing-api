import { HttpModuleOptions } from '@nestjs/axios';
import { registerAs } from '@nestjs/config';
import { PARSER_API_URL } from '@environments';

export default registerAs<HttpModuleOptions>('ai-parse-jd', () => ({
  baseURL: PARSER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}));
