import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetViewPresignedUrlByBucketAndKeyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'tscout-marketing-team' })
  bucket: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'hr-landscape-report/ENG _ The 2023 Recruitment market & 2024 _ Business Recruitment need report _ Employee.pdf',
  })
  key: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ example: 3600 })
  expiresInSeconds: number;
}
