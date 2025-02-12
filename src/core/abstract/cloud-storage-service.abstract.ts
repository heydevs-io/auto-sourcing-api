export abstract class ICloudStorageService {
  abstract getUploadPresignedUrl(
    dir: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string>;

  abstract getViewPresignedUrl(
    dir: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string>;

  abstract getViewPresignedUrlByBucketAndKey(
    bucket: string,
    key: string,
    expiresInSeconds?: number,
  ): Promise<string>;

  abstract uploadFile(
    bucket: string,
    data: string | Buffer,
    key: string,
  ): Promise<void>;
}
