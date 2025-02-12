import { Module } from '@nestjs/common';
import { LinkedInService } from './linked-in.service';
import { LinkedInController } from './linked-in.controller';
import { JobModule } from '../job/job.module';

@Module({
  imports: [JobModule],
  controllers: [LinkedInController],
  providers: [LinkedInService],
})
export class LinkedInModule {}
