import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Candidate } from './candidate.entity';

@Entity()
export class CandidateEducation extends BaseEntity {
  @Column({ type: 'uuid' })
  candidateId: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.educations)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ type: 'varchar' })
  institution: string;

  @Column({ type: 'varchar' })
  degree: string;

  @Column({ type: 'smallint' })
  fromMonth: number;

  @Column({ type: 'smallint' })
  fromYear: number;

  @Column({ type: 'smallint', nullable: true })
  toMonth: number;

  @Column({ type: 'smallint', nullable: true })
  toYear: number;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;
}
