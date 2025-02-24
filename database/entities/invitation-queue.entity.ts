import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Candidate } from './candidate.entity';
import { Job } from './job.entity';

@Entity()
export class InvitationQueue extends BaseEntity {
  @Column('uuid')
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column('uuid')
  candidateId: string;

  @JoinColumn({ name: 'candidate_id' })
  @ManyToOne(() => Candidate)
  candidate: Candidate;

  @Column('uuid')
  jobId: string;

  @JoinColumn({ name: 'job_id' })
  @ManyToOne(() => Job)
  job: Job;

  @Column({ type: 'timestamptz', nullable: true })
  sentAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  scheduledAt: Date;
}
