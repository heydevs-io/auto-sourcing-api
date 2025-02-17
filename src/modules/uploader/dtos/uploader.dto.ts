import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PresignedUrlBodyDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  @ApiProperty({ required: true, example: 'jd.pdf' })
  fileName!: string;
}

export class PresignedUrlResponseDto {
  @ApiProperty({ required: true })
  signedUrl!: string;

  @ApiProperty({ required: true })
  url: string;
}
