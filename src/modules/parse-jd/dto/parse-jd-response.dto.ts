import { Exclude, Expose } from 'class-transformer';
import { Location, User } from 'database/entities';
import { EmploymentType, SalaryType, WorkingMode } from '@enums';

export class SkillResponseDto {
  id: string;
  name: string;
}

@Exclude()
export class ParseJdResponseDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  requiredSkills: string[];
}

export class ParseJDescription {
  languageQualification: string;
  qualificationsRequired: string[];
  responsibilities: string[];
  summary: string;
}
