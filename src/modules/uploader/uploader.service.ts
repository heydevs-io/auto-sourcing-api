import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ICloudStorageService } from 'src/core/abstract';
import { PresignedUrlResponseDto } from './dtos';
import { v4 as uuidV4 } from 'uuid';

const SAVE_DIRECTORY_PATH_ON_CLOUD = 'uploads';

@Injectable()
export class UploaderService {
  private logger = new Logger(UploaderService.name);

  constructor(private readonly fileService: ICloudStorageService) {}

  private getPublicUrl(path: string): string {
    return `${process.env.CLOUD_STORAGE_PUBLIC_URL}/${path}`;
  }

  async handleGetUploadPresignedUrl(
    fileName: string,
  ): Promise<PresignedUrlResponseDto> {
    try {
      const fileExtension: string = fileName.split('.').pop() || '';
      const newFileName: string = `${uuidV4()}.${fileExtension}`;

      const presignedUrl: string = await this.fileService.getUploadPresignedUrl(
        SAVE_DIRECTORY_PATH_ON_CLOUD,
        newFileName,
      );

      return {
        signedUrl: presignedUrl,
        url: this.getPublicUrl(
          `${SAVE_DIRECTORY_PATH_ON_CLOUD}/${newFileName}`,
        ),
      };
    } catch (error) {
      this.logger.error(
        `Error while getting signed URL: ${error?.stack || error}`,
      );
      throw new InternalServerErrorException('Failed to generate signed URL.');
    }
  }
}
