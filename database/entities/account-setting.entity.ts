import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class AccountSetting extends BaseEntity {
  @Column()
  userId: string;

  @Column({ nullable: true })
  linkedIn: string;

  @Column({ nullable: true })
  gmail: string;

  @Column({ nullable: true, type: 'int' })
  linkedInDailyLimit: number;

  @Column({ nullable: true, type: 'int' })
  gmailDailyLimit: number;
}
