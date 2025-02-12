import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { ICloudStorageService } from '../../core/abstract';
import { AwsS3Service } from './aws-s3.service';

@Module({
  controllers: [UploaderController],
  providers: [
    UploaderService,
    { provide: ICloudStorageService, useClass: AwsS3Service },
  ],
})
export class UploaderModule {}
