import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { plainToInstance } from 'class-transformer';
import { CandidateInteractionLog, InvitationQueue } from 'database/entities';
import { Repository } from 'typeorm';
import { IdentifySubscriberDto, SendInvitationDto } from './dto';
import { NOVU_QUEUE_NAME, NOVU_QUEUE_TASK } from './queue';
import { NovuService } from './novu.service';
import { CandidateService } from '../candidate/candidate.service';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Processor(NOVU_QUEUE_NAME, {
  concurrency: 1,
})
export class NovuConsumer extends WorkerHost {
  constructor(
    @InjectRepository(CandidateInteractionLog)
    private readonly candidateInteractionLogRepository: Repository<CandidateInteractionLog>,
    @InjectRepository(InvitationQueue)
    private readonly invitationQueueRepository: Repository<InvitationQueue>,
    private readonly novuService: NovuService,
    private readonly candidateService: CandidateService,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case NOVU_QUEUE_TASK.SEND_INVITATION: {
        const { jobId, candidateId, scheduleType, content, userId } =
          plainToInstance(SendInvitationDto, job.data);
        const candidate =
          await this.candidateService.getCandidateById(candidateId);

        await this.novuService.trigger(NOVU_QUEUE_TASK.SEND_INVITATION, {
          to: candidateId,
          payload: {
            firstName: candidate?.firstName,
            lastName: candidate?.lastName,
            content: content,
          },
        });

        const logging = this.candidateInteractionLogRepository.create({
          userId,
          candidateId,
          jobId,
          log: 'Email sent',
        });

        await this.candidateInteractionLogRepository.save(logging);

        await this.invitationQueueRepository.update(
          {
            userId,
            candidateId,
            jobId,
          },
          { sentAt: new Date() },
        );
        break;
      }
      case NOVU_QUEUE_TASK.IDENTIFY_SUBSCRIBER: {
        await this.identifyNovu(job);
        break;
      }
    }
  }

  async identifyNovu(job: Job<IdentifySubscriberDto>): Promise<void> {
    const { candidateId } = job.data;
    const candidate = await this.candidateService.getCandidateById(candidateId);
    try {
      await this.novuService.getSubscriberByUserId(candidateId);
    } catch (error) {
      try {
        await this.novuService.createSubscriber(candidateId, {
          email: candidate?.email,
          firstName: candidate?.firstName,
          lastName: candidate?.lastName,
        });
      } catch (e) {
        this.logger.error(`Can't create or update user to novu`, {
          context: `${NovuConsumer.name}.${this.identifyNovu.name}`,
          candidateId,
          error,
        });
      }
    }
  }
}
