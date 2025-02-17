import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NOVU_QUEUE_NAME, NOVU_QUEUE_TASK } from './queue';
import { SendInvitationDto } from '../job/dto/send-invitation.dto';
import { ScheduleType } from '../../common/enums';

@Injectable()
export class NovuService {
  constructor(
    @InjectQueue(NOVU_QUEUE_NAME)
    private readonly novuQueue: Queue,
  ) {}

  async sendInvitation(data: SendInvitationDto, userId: string, jobId: string) {
    const delay = {
      [ScheduleType.SPECIFIC_TIME]:
        data.sentAt!.getTime() - new Date().getTime(),
      [ScheduleType.IMMEDIATE]: 0,
      [ScheduleType.NEXT_24_HOURS]: 24 * 60 * 60 * 1000,
    };
    await this.novuQueue.add(NOVU_QUEUE_TASK.SEND_INVITATION, data, {
      delay: delay[data.scheduleType],
    });
  }
}
