import { registerAs } from '@nestjs/config';

export default registerAs('aws-s3', () => ({
  region: process.env.AWS_S3_REGION || 'ap-southeast-1',
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || 'accessKeyId',
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || 'secretAccessKey',
  bucket: process.env.AWS_S3_BUCKET || 'bucket',
}));
