import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { PhoneCode, Gender } from '@enums';
import { CandidateEducation } from './candidate-education.entity';
import { CandidateLanguage } from './candidate-language.entity';
import { CandidateWorkExperience } from './candidate-work-experience.entity';
import { Location } from './location.entity';

@Entity()
export class Candidate extends BaseEntity {
  @Column({ type: 'varchar' })
  locationId: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: PhoneCode, nullable: true })
  phoneCode: PhoneCode;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  cvDownloadUrl: string;

  @Column({ type: 'varchar', nullable: true })
  portfolio: string;

  @Column({ type: 'varchar', nullable: true })
  summary: string;

  @OneToMany(() => CandidateEducation, (education) => education.candidate)
  educations: CandidateEducation[];

  @OneToMany(() => CandidateLanguage, (language) => language.candidate)
  languages: CandidateLanguage[];

  @OneToMany(
    () => CandidateWorkExperience,
    (workExperience) => workExperience.candidate,
  )
  workExperiences: CandidateWorkExperience[];

  @Column({ type: 'varchar', array: true, nullable: true })
  skills: string[];

  @Column({ type: 'smallint', name: 'total_yoe', nullable: true })
  totalYoE: number | null;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', first_name || ' ' || last_name)",
    select: false,
    nullable: true,
  })
  @Index('candidate_search_vector_idx', { synchronize: false })
  search_vector: string;
}
