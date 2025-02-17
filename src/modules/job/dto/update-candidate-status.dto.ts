import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CandidateConnectedStatus } from '../../../common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateCandidateStatusDto {
  @IsNotEmpty()
  @IsEnum(CandidateConnectedStatus)
  @ApiProperty({
    required: true,
    example: CandidateConnectedStatus.CONNECTED,
    enum: CandidateConnectedStatus,
  })
  status: CandidateConnectedStatus;

  @IsString()
  @ApiProperty({ required: false, example: 'Reject Reason' })
  @ValidateIf((object) => object.status === CandidateConnectedStatus.REJECTED)
  rejectReason?: string;
}

export class CandidateUpdatedResponseDto {
  @Expose()
  @ApiProperty({ required: true, example: true })
  isUpdated: boolean;
}
