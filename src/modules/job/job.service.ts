import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CandidateJobMatch,
  Job,
  InvitationQueue,
  AccountSetting,
} from 'database/entities';
import { Between, In, IsNull, Repository } from 'typeorm';
import { CandidateService } from '../candidate/candidate.service';
import { CandidateDto, CreateCandidateDto } from '../candidate/dto';
import {
  AnalyzeSearchCommandResponseDto,
  CandidateUpdatedResponseDto,
  ImportJobDto,
  MessageResponseDto,
  UpdateCandidateStatusDto,
  SendInvitationDto,
} from './dto';
import { SourcingBadRequestException } from '@exceptions';
import { ParseJdService } from '../parse-jd/parse-jd.service';
import {
  JobDeletedResponseDto,
  JobDto,
  JobUpdatedResponseDto,
  UpdateJobDto,
} from './dto/job.dto';
import { plainToInstance } from 'class-transformer';
import { PageDto, PageMetaDto, PageOptionsDto } from '@dtos';
import { InjectQueue } from '@nestjs/bullmq';
import { JOB_QUEUE_NAME, JOB_QUEUE_TASK } from './queue/constants';
import { Queue } from 'bullmq';
import { NovuService } from '../novu/novu.service';
import { DateJS } from '@utils';
import { DEFAULT_GMAIL_DAILY_LIMIT } from '@environments';
import { ScheduleType } from '../../common/enums';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(InvitationQueue)
    private readonly invitationQueueRepository: Repository<InvitationQueue>,

    @InjectRepository(AccountSetting)
    private readonly accountSettingRepository: Repository<AccountSetting>,

    private readonly candidateService: CandidateService,

    @InjectRepository(CandidateJobMatch)
    private readonly candidateJobMatchRepository: Repository<CandidateJobMatch>,

    private readonly parseJdService: ParseJdService,

    @InjectQueue(JOB_QUEUE_NAME)
    private readonly jobQueue: Queue,

    private readonly novuService: NovuService,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async getAll(
    pageOptions: PageOptionsDto,
    userId: string,
  ): Promise<PageDto<JobDto>> {
    const { take, page, skip } = pageOptions;
    const jobsQuery = this.jobRepository
      .createQueryBuilder('job')
      .where({ userId })
      .take(take)
      .skip(skip);
    const [{ entities }, itemCount] = await Promise.all([
      jobsQuery.getRawAndEntities(),
      jobsQuery.getCount(),
    ]);

    const data = entities.map((entity) => {
      return plainToInstance(JobDto, {
        ...entity,
      });
    });

    const pageMeta = new PageMetaDto({
      take: take,
      page: page,
      itemCount,
    });

    return new PageDto(data, pageMeta);
  }

  async findOne(id: string): Promise<JobDto> {
    const job = await this.jobRepository.findOne({ where: { id } });
    return plainToInstance(JobDto, job);
  }

  async update(id: string, data: UpdateJobDto): Promise<JobUpdatedResponseDto> {
    const result = await this.jobRepository.update(id, data);
    if (result.affected == 0) {
      throw new SourcingBadRequestException('Failed to update job');
    }
    return {
      isUpdated: true,
    };
  }

  async delete(id: string): Promise<JobDeletedResponseDto> {
    const result = await this.jobRepository.softDelete(id);
    if (result.affected == 0) {
      throw new SourcingBadRequestException('Failed to delete job');
    }
    return {
      isDeleted: true,
    };
  }

  async saveCandidate(
    id: string,
    data: CreateCandidateDto,
    userId: string,
  ): Promise<MessageResponseDto> {
    const candidate = await this.candidateService.getOrCreate(data);
    const candidateInJob = await this.candidateJobMatchRepository.findOne({
      where: { jobId: id, candidateId: candidate?.id, userId },
    });

    if (candidateInJob) {
      throw new SourcingBadRequestException('Candidate already exists in job');
    }

    await this.candidateJobMatchRepository.save({
      candidateId: candidate?.id,
      jobId: id,
      userId,
    });

    // identity user to novu
    await this.novuService.identifySubscriber({
      candidateId: candidate?.id,
      email: candidate?.email,
      firstName: candidate?.firstName,
      lastName: candidate?.lastName,
    });

    await this.jobQueue.add(JOB_QUEUE_TASK.MATCH_JOB, {
      jobId: id,
      candidateId: candidate?.id,
    });

    return {
      message: 'Candidate saved successfully',
    };
  }

  async analyzeSearchCommand(
    id: string,
  ): Promise<AnalyzeSearchCommandResponseDto> {
    const job = await this.jobRepository.findOne({ where: { id } });
    //TODO: Implement analyze search command
    return {
      command: 'Analyzing search command',
    };
  }

  async importJob(data: ImportJobDto, userId: string): Promise<JobDto> {
    const { jdUrl } = data;

    const parseData = await this.parseJdService.parseJdFromAiService(jdUrl);
    const job = await this.jobRepository.save({
      ...parseData,
      userId,
    });

    return plainToInstance(JobDto, job);
  }

  async updateCandidateStatus(
    jobId: string,
    candidateId: string,
    data: UpdateCandidateStatusDto,
  ): Promise<CandidateUpdatedResponseDto> {
    const candidate = await this.candidateJobMatchRepository.update(
      {
        jobId,
        candidateId,
      },
      {
        status: data.status,
        rejectReason: data.rejectReason,
      },
    );
    if (candidate.affected == 0) {
      throw new SourcingBadRequestException(
        'Failed to update candidate status',
      );
    }
    return {
      isUpdated: true,
    };
  }

  async getCandidates(
    id: string,
    pageOptions: PageOptionsDto,
  ): Promise<PageDto<CandidateDto>> {
    const { take, page, skip } = pageOptions;
    const candidatesQuery = this.candidateJobMatchRepository
      .createQueryBuilder('candidateJobMatch')
      .leftJoinAndSelect('candidateJobMatch.candidate', 'candidate')
      .leftJoinAndSelect('candidate.educations', 'educations')
      .leftJoinAndSelect('candidate.languages', 'languages')
      .leftJoinAndSelect('candidate.workExperiences', 'workExperiences')
      .where({ jobId: id })
      .take(take)
      .skip(skip);

    const [{ entities }, itemCount] = await Promise.all([
      candidatesQuery.getRawAndEntities(),
      candidatesQuery.getCount(),
    ]);

    const data = entities.map((entity) => {
      return plainToInstance(CandidateDto, entity.candidate);
    });

    const pageMeta = new PageMetaDto({
      take: take,
      page: page,
      itemCount,
    });

    return new PageDto(data, pageMeta);
  }

  async sendInvitation(
    id: string,
    data: SendInvitationDto,
    userId: string,
  ): Promise<MessageResponseDto> {
    if (
      data.scheduleType === ScheduleType.SPECIFIC_TIME &&
      DateJS.sameOrBefore(data.sentAt, new Date())
    ) {
      throw new SourcingBadRequestException('Sent at must be in the future');
    }

    const userSetting = await this.accountSettingRepository.findOne({
      where: { userId },
    });

    const emailLimit = userSetting?.mailDailyLimit || DEFAULT_GMAIL_DAILY_LIMIT;

    const dateInvitation = await this.invitationQueueRepository.count({
      where: {
        userId,
        scheduledAt: Between(
          DateJS.getStartOfDay(new Date()).toDate(),
          DateJS.getEndOfDay(new Date()).toDate(),
        ),
      },
    });

    let message: string | null = null;
    const restLimit = dateInvitation + data.candidateIds.length - emailLimit;
    if (restLimit > 0) {
      message = `Your limit setting is already reached today. So we will send ${data.candidateIds.length - restLimit > 1 ? `${data.candidateIds.length - restLimit} invitations` : '1 invitation'} today and the rest will be sent in the next day`;
    }
    const { candidateIds, ...rest } = data;
    for (let i = 0; i < candidateIds.length; i++) {
      await this.novuService.sendInvitation({
        ...rest,
        jobId: id,
        userId,
        candidateId: candidateIds[i],
        scheduleType:
          i < restLimit ? rest.scheduleType : ScheduleType.NEXT_24_HOURS,
      });
    }
    return {
      message: message || 'Invitation have been scheduled successfully',
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.info('Cron job running');
    const invitations = await this.invitationQueueRepository.find({
      where: {
        scheduledAt: Between(
          DateJS.getStartOfDay(new Date()).toDate(),
          DateJS.getEndOfDay(new Date()).toDate(),
        ),
        sentAt: IsNull(),
      },
    });

    await this.invitationQueueRepository.delete({
      id: In(invitations.map((invitation) => invitation.id)),
    });
  }
}
