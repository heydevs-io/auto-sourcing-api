import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ScheduleType } from '@enums';

export class SendInvitationDto {
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ example: ['a1b2c3d4-5678-90ef-ghij-klmnopqrstuv'] })
  candidateIds: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Hello, we are glad to invite you to our job' })
  content: string;

  @IsEnum(ScheduleType)
  @IsNotEmpty()
  @ApiProperty({ example: ScheduleType.IMMEDIATE })
  scheduleType: ScheduleType;

  @IsDateString()
  @IsOptional()
  @ValidateIf((object) => object.scheduleType === ScheduleType.SPECIFIC_TIME)
  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  sentAt?: Date;
}
