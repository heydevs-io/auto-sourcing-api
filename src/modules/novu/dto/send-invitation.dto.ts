import { ScheduleType } from '@enums';

export class SendInvitationDto {
  userId: string;
  jobId: string;
  candidateId: string;
  scheduleType: ScheduleType;
  content: string;
  sentAt?: Date;
}
