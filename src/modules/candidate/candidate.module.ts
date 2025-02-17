import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Candidate,
  CandidateInteractionLog,
  Location,
} from 'database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, CandidateInteractionLog, Location]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
