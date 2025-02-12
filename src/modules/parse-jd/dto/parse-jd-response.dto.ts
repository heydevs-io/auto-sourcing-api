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
  companyId: string;

  @Expose()
  userId: string;

  @Expose()
  user: User;

  @Expose()
  title: string;

  @Expose()
  totalYearOfExperience: number;

  @Expose()
  employmentType: EmploymentType;

  @Expose()
  currency: string;

  @Expose()
  minSalary: number;

  @Expose()
  maxSalary: number;

  @Expose()
  isNegotiable: boolean;

  @Expose()
  onboardingDate: Date;

  @Expose()
  vacancies: number;

  @Expose()
  description: string;

  @Expose()
  isHiring: boolean;

  @Expose()
  isDraft: boolean;

  @Expose()
  requiredSkillIds: string[];

  @Expose()
  attachmentUrl: string;

  @Expose()
  locations: Location[];

  @Expose()
  workingMode: WorkingMode;

  @Expose()
  salaryType: SalaryType;

  @Expose()
  skills: SkillResponseDto;
}

export class ParseJDescription {
  languageQualification: string;
  qualificationsRequired: string[];
  responsibilities: string[];
  summary: string;
}
