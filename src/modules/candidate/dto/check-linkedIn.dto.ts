import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckLinkedInDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    required: true,
    example: [
      'https://www.linkedin.com/in/john-doe',
      'https://www.linkedin.com/in/jane-doe',
    ],
  })
  linkedInUrls: string[];
}

export class CheckLinkedInResponse {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    required: true,
    example: [
      'https://www.linkedin.com/in/john-doe',
      'https://www.linkedin.com/in/jane-doe',
    ],
  })
  linkedIns: string[];
}
