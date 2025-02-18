import { InvitationType, ScheduleType } from '@enums';

export class SendInvitationDto {
  jobId: string;
  candidateId: string;
  scheduleType: ScheduleType;
  invitationType: InvitationType;
  content: string;
}
