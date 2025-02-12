import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PresignedUrlBodyDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  @ApiProperty({ required: true, example: 'cv.pdf' })
  fileName!: string;

  // @IsEnum(FileCategory)
  // @IsNotEmpty()
  // @Transform(({ value }) => String(value))
  // @ApiProperty({
  //   enum: FileCategory,
  //   required: true,
  //   example: FileCategory.CV,
  // })
  // category!: FileCategory;
}

export class PresignedUrlResponseDto {
  @ApiProperty({ required: true })
  signedUrl!: string;

  @ApiProperty({ required: true })
  url: string;
}
