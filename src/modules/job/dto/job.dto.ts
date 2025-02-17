import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class JobDto {
  @Expose()
  @ApiProperty({
    required: true,
    example: 'a1b2c3d4-5678-90ef-ghij-klmnopqrstuv',
  })
  id: string;

  @Expose()
  @ApiProperty({ required: true, example: 'Job Title' })
  title: string;

  @Expose()
  @ApiProperty({ required: true, example: ['Keyword1', 'Keyword2'] })
  keywords: string[];

  @Expose()
  @ApiProperty({ required: false, example: 'Search Command' })
  searchCommand?: string;

  @Expose()
  @ApiProperty({ required: true, example: 'Job Description' })
  description: string;
}

@Exclude()
export class JobDeletedResponseDto {
  @Expose()
  @ApiProperty({ required: true, example: true })
  isDeleted: boolean;
}

@Exclude()
export class JobUpdatedResponseDto {
  @Expose()
  @ApiProperty({ required: true, example: true })
  isUpdated: boolean;
}

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Job Title' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Search Command' })
  searchCommand?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Job Description' })
  description?: string;
}
