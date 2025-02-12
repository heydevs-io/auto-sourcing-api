import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  getOrCreate(createCandidateDto: CreateCandidateDto) {
    const candidate = this.candidateRepository.findOne({
      where: { email: createCandidateDto.email },
    });

    if (candidate) {
      return candidate;
    }

    return this.candidateRepository.create(createCandidateDto);
  }
}
