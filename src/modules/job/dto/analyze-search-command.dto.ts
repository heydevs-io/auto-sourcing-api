import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AnalyzeSearchCommandResponseDto {
  @Expose()
  @ApiProperty({ required: true, example: 'Analyzing search command' })
  command: string;
}
