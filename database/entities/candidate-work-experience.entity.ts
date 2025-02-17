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

  @Column({ type: 'smallint', nullable: true })
  fromMonth: number;

  @Column({ type: 'smallint', nullable: true })
  fromYear: number;

  @Column({ type: 'smallint', nullable: true })
  toMonth: number;

  @Column({ type: 'smallint', nullable: true })
  toYear: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;
}
