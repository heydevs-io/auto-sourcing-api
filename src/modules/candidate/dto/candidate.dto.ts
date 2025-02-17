import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { LanguageLevel, PhoneCode } from '@enums';

export class LocationDto {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ example: 'United States' })
  country: string;

  @Expose()
  @ApiProperty({ example: 'California' })
  state: string;
}

@Exclude()
export class EducationDto {
  @Expose()
  @ApiProperty({ example: 'University of California, Los Angeles' })
  institution: string;

  @Expose()
  @ApiProperty({ example: 'Bachelor of Science' })
  degree: string;

  @Expose()
  @ApiProperty({ example: 1 })
  fromMonth: number;

  @Expose()
  @ApiProperty({ example: 2020 })
  fromYear: number;

  @Expose()
  @ApiProperty({ example: 1 })
  toMonth: number;

  @Expose()
  @ApiProperty({ example: 2024 })
  toYear: number;

  @Expose()
  @ApiProperty({ example: false })
  isCurrent: boolean;
}

@Exclude()
export class LanguageDto {
  @Expose()
  @ApiProperty({ example: 'English' })
  language: string;

  @Expose()
  @ApiProperty({ example: LanguageLevel.BASIC })
  level: LanguageLevel;
}

@Exclude()
export class WorkExperienceDto {
  @Expose()
  @ApiProperty({ example: 'Google' })
  companyName: string;

  @Expose()
  @ApiProperty({ example: 'Software Engineer' })
  position: string;

  @Expose()
  @ApiProperty({ example: 1 })
  fromMonth: number;

  @Expose()
  @ApiProperty({ example: 2024 })
  fromYear: number;

  @Expose()
  @ApiProperty({ example: 1 })
  toMonth: number;

  @Expose()
  @ApiProperty({ example: 2024 })
  toYear: number;

  @Expose()
  @ApiProperty({ example: 'Software Engineer' })
  description: string;

  @Expose()
  @Expose()
  @ApiProperty({ example: false })
  isCurrent: boolean;
}

@Exclude()
export class CandidateDto {
  @Expose()
  @ApiProperty({ example: 'c7d8e9f0-1234-5678-9abc-def012345678' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'c7d8e9f0-1234-5678-9abc-def012345678' })
  locationId: string;

  @Expose()
  @ApiProperty({ type: LocationDto })
  location: LocationDto;

  @Expose()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 'Software Engineer' })
  title: string;

  @Expose()
  @ApiProperty({ example: PhoneCode.US })
  phoneCode: PhoneCode;

  @Expose()
  @ApiProperty({ example: '123456789' })
  phone: string;

  @Expose()
  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatar: string;

  @Expose()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'https://example.com/portfolio' })
  portfolio: string;

  @Expose()
  @ApiProperty({ example: 'Software Engineer' })
  summary: string;

  @Expose()
  @ApiProperty({ type: [EducationDto] })
  educations: EducationDto[];

  @Expose()
  @ApiProperty({ type: [LanguageDto] })
  languages: LanguageDto[];

  @Expose()
  @ApiProperty({ type: [WorkExperienceDto] })
  workExperiences: WorkExperienceDto[];

  @Expose()
  @ApiProperty({ example: ['Skill 1', 'Skill 2'] })
  skills: string[];

  @Expose()
  @ApiProperty({ example: 'https://www.linkedin.com/in/john-doe' })
  linkedInUrl?: string;
}
