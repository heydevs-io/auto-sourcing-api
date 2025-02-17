import { BaseEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Candidate } from './candidate.entity';
import { Job } from './job.entity';
import { User } from './user.entity';

export class CandidateInteractionLog extends BaseEntity {
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  candidateId: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column('uuid')
  jobId: string;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column()
  log: string;
}
