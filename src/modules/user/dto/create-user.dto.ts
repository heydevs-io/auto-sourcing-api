import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, example: 'john.doe@example.com' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'John' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Doe' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Introduction' })
  introduction?: string;
}
