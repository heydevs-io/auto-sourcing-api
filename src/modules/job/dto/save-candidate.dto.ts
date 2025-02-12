import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateCandidateDto } from '../../candidate/dto';

export class SaveCandidateDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCandidateDto)
  @ApiProperty({ type: [CreateCandidateDto] })
  candidates: CreateCandidateDto[];
}

export class SaveCandidateResponseDto {
  @ApiProperty({ type: String })
  message: string;
}
