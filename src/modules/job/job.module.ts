import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'database/entities';
import { CandidateModule } from '../candidate/candidate.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JOB_QUEUE_NAME } from './queue/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    BullModule.registerQueue({ name: JOB_QUEUE_NAME }),
    HttpModule,
    CandidateModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
