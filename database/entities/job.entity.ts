import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Job extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', array: true })
  keywords: string[];

  @Column({ type: 'text' })
  searchCommand: string;

  @Column({ type: 'text' })
  description: string;

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
