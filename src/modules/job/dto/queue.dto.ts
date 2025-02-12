import { IsNotEmpty, IsString } from 'class-validator';

export class MatchJobInputDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  candidateId: string;
}
