import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'database/entities';
import { Repository } from 'typeorm';
import { UpdateJobDto } from './dto/update-job.dto';
import { SaveCandidateDto, SaveCandidateResponseDto } from './dto';
import { CandidateService } from '../candidate/candidate.service';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    private readonly candidateService: CandidateService,
  ) {}

  findOne(id: string) {
    return this.jobRepository.findOne({ where: { id } });
  }

  update(id: string, data: UpdateJobDto) {
    return this.jobRepository.update(id, data);
  }

  delete(id: string) {
    return this.jobRepository.softDelete(id);
  }

  async saveCandidate(
    id: string,
    data: SaveCandidateDto,
  ): Promise<SaveCandidateResponseDto> {
    const candidates = await Promise.all(
      data.candidates.map((candidate) =>
        this.candidateService.getOrCreate(candidate),
      ),
    );

    return {
      message: 'Candidates saved successfully',
    };
  }
}
