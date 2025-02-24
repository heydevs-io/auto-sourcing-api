import { Module } from '@nestjs/common';
import { NovuService } from './novu.service';
import { BullModule } from '@nestjs/bullmq';
import { NOVU_QUEUE_NAME } from './queue';
import { NovuConsumer } from './novu.consumer';
import { CandidateInteractionLog, InvitationQueue } from 'database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateInteractionLog, InvitationQueue]),
    BullModule.registerQueue({
      name: NOVU_QUEUE_NAME,
    }),
    CandidateModule,
  ],
  controllers: [],
  providers: [NovuService, NovuConsumer],
  exports: [NovuService],
})
export class NovuModule {}
