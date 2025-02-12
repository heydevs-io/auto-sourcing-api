import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
}
