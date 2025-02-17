import { CandidateConnectedStatus } from '@enums';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Candidate } from './candidate.entity';
import { Job } from './job.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
@Entity()
@Unique(['candidateId', 'jobId', 'userId'])
export class CandidateJobMatch extends BaseEntity {
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

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  score?: number;

  @Column({
    type: 'enum',
    enum: CandidateConnectedStatus,
    default: CandidateConnectedStatus.SOURCED,
  })
  status: CandidateConnectedStatus;

  @Column({ type: 'varchar', nullable: true })
  rejectReason?: string;

  @Column({ type: 'varchar', nullable: true })
  connectInvitation?: string;

  @Column({ type: 'varchar', nullable: true })
  connectEmail?: string;
}
