import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { LanguageLevel } from '@enums';

export class CreateWorkExperienceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Company Name' })
  companyName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Position' })
  position: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  fromMonth?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, example: 2021 })
  fromYear?: number;

  @IsNumber()
  @ValidateIf((object, value) => object.isCurrent !== true)
  @ApiProperty({ required: false, example: 1 })
  toMonth?: number;

  @IsNumber()
  @IsOptional()
  @ValidateIf((object, value) => object.isCurrent !== true)
  @ApiProperty({ required: false, example: 2025 })
  toYear?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'Description' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, example: true })
  isCurrent?: boolean;
}

export class CreateEducationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'University' })
  institution: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Bachelor' })
  degree: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, example: 1 })
  fromMonth?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, example: 2021 })
  fromYear?: number;

  @IsNumber()
  @ValidateIf((object, value) => object.isCurrent !== true)
  @ApiProperty({ required: false, example: 1 })
  toMonth?: number;

  @IsNumber()
  @ValidateIf((object, value) => object.isCurrent !== true)
  @ApiProperty({ required: false, example: 2025 })
  toYear?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, example: true })
  isCurrent?: boolean;
}

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'English' })
  language: string;

  @IsNotEmpty()
  @IsEnum(LanguageLevel)
  @ApiProperty({
    required: true,
    example: LanguageLevel.NATIVE_BILINGUAL,
    enum: LanguageLevel,
  })
  level: LanguageLevel;
}

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'John' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'United States' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'California' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ required: true, example: ['Skill 1', 'Skill 2'] })
  skills: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkExperienceDto)
  @ApiProperty({ type: [CreateWorkExperienceDto] })
  workExperiences: CreateWorkExperienceDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  @ApiProperty({ type: [CreateEducationDto] })
  educations: CreateEducationDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  @ApiProperty({ type: [CreateLanguageDto] })
  languages: CreateLanguageDto[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'https://www.portfolio.com' })
  portfolio: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: 'https://www.avatar.com' })
  avatar?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'https://www.linkedin.com/in/john-doe',
  })
  linkedInUrl: string;
}
