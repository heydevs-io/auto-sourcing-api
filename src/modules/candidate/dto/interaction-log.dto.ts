import { ScheduleType } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { JobDto } from '../../job/dto';

@Exclude()
export class CandidateInteractionLogDto {
  @Expose()
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Invitation sent successfully' })
  log: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: JobDto })
  job: JobDto;

  @Expose()
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6' })
  jobId: string;
}
