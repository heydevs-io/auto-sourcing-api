import { registerAs } from '@nestjs/config';
import { NOVU_API_KEY, NOVU_SERVER_URL } from '@environments';

export default registerAs('novu', () => ({
  novuApiKey: NOVU_API_KEY,
  novuServerUrl: NOVU_SERVER_URL,
}));
