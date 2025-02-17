import { Module } from '@nestjs/common';
import { NovuService } from './novu.service';
import { BullModule } from '@nestjs/bullmq';
import { NOVU_QUEUE_NAME } from './queue';
import { NovuConsumer } from './novu.consumer';
import { CandidateInteractionLog } from '../../../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateInteractionLog]),
    BullModule.registerQueue({
      name: NOVU_QUEUE_NAME,
    }),
  ],
  controllers: [],
  providers: [NovuService, NovuConsumer],
  exports: [NovuService],
})
export class NovuModule {}
