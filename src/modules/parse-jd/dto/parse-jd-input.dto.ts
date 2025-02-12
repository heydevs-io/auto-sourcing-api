import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class ParseJdBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ required: true, example: 'https://example.com' })
  url: string;
}
