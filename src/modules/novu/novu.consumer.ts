import { PARSER_API_URL } from '@environments';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Job } from 'bullmq';
import { plainToInstance } from 'class-transformer';
import {
  Candidate,
  CandidateInteractionLog,
  CandidateJobMatch,
} from 'database/entities';
import { Repository } from 'typeorm';
import { NOVU_QUEUE_NAME, NOVU_QUEUE_TASK } from './queue';
import { SendInvitationDto } from './dto/send-invitation.dto';

@Processor(NOVU_QUEUE_NAME, {
  concurrency: 1,
})
export class NovuConsumer extends WorkerHost {
  constructor(
    @InjectRepository(CandidateInteractionLog)
    private readonly candidateInteractionLogRepository: Repository<CandidateInteractionLog>,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case NOVU_QUEUE_TASK.SEND_INVITATION: {
        const { jobId, candidateId, scheduleType } = plainToInstance(
          SendInvitationDto,
          job.data,
        );

        //TODO: Implement send invitation

        await this.candidateInteractionLogRepository.save({
          candidateId,
          jobId,
          type: scheduleType,
        });
      }
    }
  }
}
