import { HttpModuleOptions } from '@nestjs/axios';
import { registerAs } from '@nestjs/config';
import { AI_PARSE_JD_BASE_URL } from '@environments';

export default registerAs<HttpModuleOptions>('ai-parse-jd', () => ({
  baseURL: AI_PARSE_JD_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}));
