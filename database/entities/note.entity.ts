import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Candidate } from './candidate.entity';
import { User } from './user.entity';

@Entity()
export class Note extends BaseEntity {
  @Column({ type: 'varchar' })
  note: string;

  @Column({ type: 'varchar' })
  candidateId: string;

  @JoinColumn({ name: 'candidateId' })
  @ManyToOne(() => Candidate)
  candidate: Candidate;

  @Column({ type: 'varchar' })
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)
  user: User;
}
