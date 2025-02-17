import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate, CandidateJobMatch, Job } from 'database/entities';
import { CandidateModule } from '../candidate/candidate.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JOB_QUEUE_NAME } from './queue/constants';
import { ParseJdModule } from '../parse-jd/parse-jd.module';
import { NovuModule } from '../novu/novu.module';
import { JobConsumer } from './queue/job.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, CandidateJobMatch, Candidate]),
    BullModule.registerQueue({ name: JOB_QUEUE_NAME }),
    HttpModule,
    CandidateModule,
    ParseJdModule,
    NovuModule,
  ],
  controllers: [JobController],
  providers: [JobService, JobConsumer],
  exports: [JobService],
})
export class JobModule {}
