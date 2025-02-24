import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class AccountSetting extends BaseEntity {
  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  linkedIn: string;

  @Column({ nullable: true })
  gmail: string;

  @Column({ nullable: true, type: 'int' })
  linkedInDailyLimit: number;

  @Column({ nullable: true, type: 'int' })
  mailDailyLimit: number;
}
