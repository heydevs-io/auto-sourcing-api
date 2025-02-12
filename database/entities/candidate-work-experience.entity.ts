import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Candidate } from './candidate.entity';

@Entity()
export class CandidateWorkExperience extends BaseEntity {
  @Column('uuid')
  candidateId: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.workExperiences)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column()
  companyName: string;

  @Column()
  position: string;

  @Column({ type: 'smallint' })
  fromMonth: number;

  @Column({ type: 'smallint' })
  fromYear: number;

  @Column({ type: 'smallint' })
  toMonth: number;

  @Column({ type: 'smallint' })
  toYear: number;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;
}
