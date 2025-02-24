import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Job extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  keywords?: string[];

  @Column({ type: 'varchar', nullable: true })
  searchCommand?: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true, array: true })
  requiredSkills?: string[];

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', title)",
    select: false,
    nullable: true,
  })
  @Index('job_search_vector_idx', { synchronize: false })
  search_vector: string;
}
