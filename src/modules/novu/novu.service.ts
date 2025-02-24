import { NovuConfig } from '@config';
import { ScheduleType } from '@enums';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ISubscriberPayload, Novu } from '@novu/node';
import { AxiosResponse } from 'axios';
import { Queue } from 'bullmq';
import { DateJS } from '../../common/utils';
import { IdentifySubscriberDto, SendInvitationDto } from './dto';
import { NOVU_QUEUE_NAME, NOVU_QUEUE_TASK } from './queue';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationQueue } from 'database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class NovuService extends Novu {
  constructor(
    @Inject(NovuConfig.KEY)
    private readonly config: ConfigType<typeof NovuConfig>,
    @InjectQueue(NOVU_QUEUE_NAME)
    private readonly novuQueue: Queue,
    @InjectRepository(InvitationQueue)
    private readonly invitationQueueRepository: Repository<InvitationQueue>,
  ) {
    super(config.novuApiKey, { backendUrl: config.novuServerUrl });
  }

  async sendInvitation(data: SendInvitationDto) {
    const delay = {
      [ScheduleType.SPECIFIC_TIME]: data.sentAt
        ? DateJS.diff(new Date(), data.sentAt, 'millisecond')
        : 0,
      [ScheduleType.IMMEDIATE]: 0,
      [ScheduleType.NEXT_24_HOURS]: 24 * 60 * 60 * 1000,
    };

    await this.invitationQueueRepository.save({
      userId: data.userId,
      candidateId: data.candidateId,
      jobId: data.jobId,
      scheduledAt:
        data.scheduleType === ScheduleType.IMMEDIATE
          ? new Date()
          : new Date(Date.now() + delay[data.scheduleType]),
    });

    await this.novuQueue.add(NOVU_QUEUE_TASK.SEND_INVITATION, data, {
      delay: delay[data.scheduleType],
      removeOnComplete: {
        count: 100,
        age: 1000 * 60 * 60 * 24, // 1 day
      },
      attempts: 3,
    });
  }

  async getSubscriberByUserId(
    userId: string,
  ): Promise<AxiosResponse<any, any>> {
    return this.subscribers.get(userId);
  }

  async createSubscriber(
    userId: string,
    metadata: ISubscriberPayload,
  ): Promise<AxiosResponse<any, any>> {
    return this.subscribers.identify(userId, metadata);
  }

  async identifySubscriber(data: IdentifySubscriberDto) {
    return this.novuQueue.add(NOVU_QUEUE_TASK.IDENTIFY_SUBSCRIBER, data);
  }
}
