import { Column, Entity, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@Unique(['country', 'state'])
@Index('idx_location_country_state', ['country', 'state'], { unique: true })
export class Location extends BaseEntity {
  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  state: string;
}
