import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ScheduleType } from '@enums';

export class SendInvitationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a1b2c3d4-5678-90ef-ghij-klmnopqrstuv' })
  candidateId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ScheduleType)
  @IsNotEmpty()
  scheduleType: ScheduleType;

  @IsDateString()
  @IsNotEmpty()
  @ValidateIf((object) => object.scheduleType === ScheduleType.SPECIFIC_TIME)
  sentAt?: Date;
}
