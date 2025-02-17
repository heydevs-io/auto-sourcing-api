import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Candidate,
  CandidateEducation,
  CandidateInteractionLog,
  CandidateLanguage,
  CandidateWorkExperience,
  Location,
  Note,
} from 'database/entities';
import { DataSource, In, QueryRunner, Repository } from 'typeorm';
import { CandidateDto, CheckLinkedInDto, CheckLinkedInResponse } from './dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { SourcingNotFoundException } from '../../common/exception';
import { plainToInstance } from 'class-transformer';
import { CandidateInteractionLogDto } from './dto/interaction-log.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,

    @InjectRepository(CandidateInteractionLog)
    private readonly candidateInteractionLogRepository: Repository<CandidateInteractionLog>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    private readonly dataSource: DataSource,
  ) {}

  async getOrCreate(createCandidateDto: CreateCandidateDto) {
    const candidate = await this.candidateRepository.findOne({
      where: { linkedInUrl: createCandidateDto.linkedInUrl },
    });

    if (candidate) {
      return candidate;
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let location = await this.locationRepository.findOne({
      where: {
        country: createCandidateDto.country,
        state: createCandidateDto.state,
      },
    });

    if (!location) {
      location = await queryRunner.manager.save(Location, {
        country: createCandidateDto.country,
        state: createCandidateDto.state,
      });
    }

    const { educations, languages, workExperiences, ...rest } =
      createCandidateDto;

    const newCandidate = await queryRunner.manager.save(Candidate, {
      ...rest,
      locationId: location.id,
    });

    await Promise.all([
      educations &&
        educations.map((education) =>
          queryRunner.manager.save(CandidateEducation, {
            ...education,
            candidateId: newCandidate.id,
          }),
        ),
      languages &&
        languages.map((language) =>
          queryRunner.manager.save(CandidateLanguage, {
            ...language,
            candidateId: newCandidate.id,
          }),
        ),
      workExperiences &&
        workExperiences.map((workExperience) =>
          queryRunner.manager.save(CandidateWorkExperience, {
            ...workExperience,
            candidateId: newCandidate.id,
          }),
        ),
    ]);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return newCandidate;
  }

  async checkLinkedIn(
    checkLinkedInDto: CheckLinkedInDto,
  ): Promise<CheckLinkedInResponse> {
    const { linkedInUrls } = checkLinkedInDto;

    const linkedInProfiles = await this.candidateRepository.find({
      where: { linkedInUrl: In(linkedInUrls) },
    });

    return {
      linkedIns: linkedInProfiles.map((profile) => profile.linkedInUrl!),
    };
  }

  async getCandidate(id: string, userId: string) {
    const candidate = await this.candidateRepository
      .createQueryBuilder('candidate')
      .leftJoinAndMapOne(
        'candidate.notes',
        Note,
        'note',
        'note.userId = :userId AND note.candidateId = candidate.id',
        {
          userId,
        },
      )
      .leftJoinAndSelect('candidate.workExperiences', 'workExperience')
      .leftJoinAndSelect('candidate.educations', 'education')
      .leftJoinAndSelect('candidate.languages', 'language')
      .where('candidate.id = :id', { id })
      .getOne();

    if (!candidate) {
      throw new SourcingNotFoundException('Candidate not found');
    }

    return plainToInstance(CandidateDto, candidate);
  }

  async getInteractionLogs(id: string, userId: string) {
    const logs = await this.candidateInteractionLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.job', 'job')
      .where('log.candidateId = :id', { id })
      .getMany();

    return plainToInstance(CandidateInteractionLogDto, logs);
  }
}
