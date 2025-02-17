import { ScheduleType } from '@enums';

export class SendInvitationDto {
  jobId: string;
  candidateId: string;
  scheduleType: ScheduleType;
}
