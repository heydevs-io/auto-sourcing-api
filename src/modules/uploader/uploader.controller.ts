import { SourcingBadRequestException } from '@exceptions';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';
import { PresignedUrlBodyDto, PresignedUrlResponseDto } from './dtos';
import { UploaderService } from './uploader.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Uploader')
@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @HttpCode(HttpStatus.OK)
  @Put('sign-url')
  @ApiResponse({
    status: 200,
    type: PresignedUrlResponseDto,
  })
  async getUploadPresignedUrl(
    @Body() body: PresignedUrlBodyDto,
  ): Promise<PresignedUrlResponseDto> {
    const { fileName } = body;

    if (!fileName) {
      throw new SourcingBadRequestException('Invalid input');
    }

    return this.uploaderService.handleGetUploadPresignedUrl(fileName);
  }
}
