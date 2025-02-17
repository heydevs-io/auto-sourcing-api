import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '../../../common/enums';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'John Doe' })
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

export class UpdateUserStatusDto {
  @IsEnum(UserStatus)
  @ApiProperty({ required: true, example: UserStatus.ACTIVE })
  status: UserStatus;
}
