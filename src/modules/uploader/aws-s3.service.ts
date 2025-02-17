import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AwsS3Config } from '@config';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ICloudStorageService } from 'src/core/abstract';

const DEFAULT_PRESIGNED_URL_EXPIRE_TIME_IN_SECONDS = 120;

@Injectable()
export class AwsS3Service
  extends ICloudStorageService
  implements OnApplicationBootstrap
{
  private readonly logger = new Logger(AwsS3Service.name);
  private s3Client: S3Client;

  constructor(
    @Inject(AwsS3Config.KEY)
    private readonly config: ConfigType<typeof AwsS3Config>,
  ) {
    super();
  }

  onApplicationBootstrap() {
    this.s3Client = new S3Client({
      endpoint: 'http://localhost:4566', //TODO: Remove this when deploying to production
      forcePathStyle: true, //TODO: Remove this when deploying to production
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    });
  }

  /**
   * @description Retrieves a presigned URL for uploading a file to the specified directory and key.
   * @param {string} dir - The subdirectory within the bucket where the file will be uploaded.
   * @param {string} key - The name of the file.
   * @param {number} [expiresInSeconds] - The expiration time for the presigned URL in seconds.
   * @returns {Promise<string>} - A promise that resolves to the presigned URL for uploading the file.
   * @throws {ServiceUnavailableException} - If AWS S3 is unavailable.
   */
  async getUploadPresignedUrl(
    dir: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string> {
    try {
      const params: PutObjectCommandInput = {
        Bucket: this.config.bucket,
        Key: `${dir}/${key}`,
      };
      const command: PutObjectCommand = new PutObjectCommand(params);
      const presignedUrl: string = await getSignedUrl(this.s3Client, command, {
        expiresIn:
          expiresInSeconds || DEFAULT_PRESIGNED_URL_EXPIRE_TIME_IN_SECONDS,
      });

      return presignedUrl;
    } catch (error) {
      this.logger.error('AWS S3 unavailable!', error?.stack || error);
      throw new ServiceUnavailableException('AWS S3 unavailable!');
    }
  }

  /**
   * @description Retrieves a presigned URL for viewing a file in AWS S3.
   * @param {string} dir - The subdirectory within the bucket where the file is located.
   * @param {string} key - The name of the file.
   * @param {number} [expiresInSeconds] - The expiration time for the presigned URL in seconds.
   * @return {Promise<string>} A promise that resolves to the presigned URL for viewing the file.
   * @throws {ServiceUnavailableException} If AWS S3 is unavailable.
   */
  async getViewPresignedUrl(
    dir: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string> {
    try {
      const params: GetObjectCommandInput = {
        Bucket: this.config.bucket,
        Key: `${dir}/${key}`,
      };
      const command: GetObjectCommand = new GetObjectCommand(params);
      const presignedUrl: string = await getSignedUrl(this.s3Client, command, {
        expiresIn:
          expiresInSeconds || DEFAULT_PRESIGNED_URL_EXPIRE_TIME_IN_SECONDS,
      });

      return presignedUrl;
    } catch (error) {
      this.logger.error('AWS S3 unavailable!', error?.stack || error);
      throw new ServiceUnavailableException('AWS S3 unavailable!');
    }
  }

  async getViewPresignedUrlByBucketAndKey(
    bucket: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string> {
    try {
      const params: GetObjectCommandInput = {
        Bucket: bucket,
        Key: key,
      };
      const command: GetObjectCommand = new GetObjectCommand(params);
      const presignedUrl: string = await getSignedUrl(this.s3Client, command, {
        expiresIn:
          expiresInSeconds || DEFAULT_PRESIGNED_URL_EXPIRE_TIME_IN_SECONDS,
      });

      return presignedUrl;
    } catch (error) {
      this.logger.error('AWS S3 unavailable!', error?.stack || error);
      throw new ServiceUnavailableException('AWS S3 unavailable!');
    }
  }

  async uploadFile(
    bucket: string,
    data: string | Buffer,
    key: string,
  ): Promise<void> {
    try {
      const command: PutObjectCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: data,
      });
      await this.s3Client.send(command);
    } catch (error) {
      this.logger.error('AWS S3 unavailable!', error?.stack || error);
      throw new ServiceUnavailableException('AWS S3 unavailable!');
    }
  }
}
