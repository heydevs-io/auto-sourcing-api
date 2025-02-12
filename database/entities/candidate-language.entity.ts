import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Candidate } from './candidate.entity';
import { LanguageLevel } from '@enums';
import { BaseEntity } from './base.entity';
@Entity()
export class CandidateLanguage extends BaseEntity {
  @Column({ type: 'uuid' })
  candidateId: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.languages)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'enum', enum: LanguageLevel, nullable: true })
  level: LanguageLevel;
}
