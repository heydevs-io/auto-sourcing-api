import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateJobMatch, Job } from 'database/entities';
import { Repository } from 'typeorm';
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

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    private readonly candidateService: CandidateService,

    @InjectRepository(CandidateJobMatch)
    private readonly candidateJobMatchRepository: Repository<CandidateJobMatch>,

    private readonly parseJdService: ParseJdService,

    @InjectQueue(JOB_QUEUE_NAME)
    private readonly jobQueue: Queue,

    private readonly novuService: NovuService,
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
    //TODO: Implement send invitation
    await this.novuService.sendInvitation(data, userId, id);
    return {
      message: 'Invitation have been scheduled successfully',
    };
  }
}
