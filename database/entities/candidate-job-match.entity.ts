import { CandidateConnectedStatus } from '@enums';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntityWithoutId } from './base.entity';

@Entity()
export class CandidateJobMatch extends BaseEntityWithoutId {
  @PrimaryColumn()
  candidateId: string;

  @PrimaryColumn()
  jobId: string;

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
}
