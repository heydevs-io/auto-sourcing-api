import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImportJobDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'https://example.com/job.pdf' })
  jdUrl: string;
}
