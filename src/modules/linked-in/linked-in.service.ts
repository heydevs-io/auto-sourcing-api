import { Injectable } from '@nestjs/common';
import { JobService } from '../job/job.service';

@Injectable()
export class LinkedInService {
  constructor(private readonly jobService: JobService) {}

  async generateSearchCommand(jobId: string) {
    // TODO: Implement call to AI to generate search command
    const searchCommand = 'search command';
    await this.jobService.update(jobId, { searchCommand });

    return searchCommand;
  }

  async getSuitCandidate(jobId: string) {
    const job = await this.jobService.findOne(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    const searchCommand = job?.searchCommand;

    if (!searchCommand) {
      throw new Error('Job not have search command');
    }

    // TODO: Implement call to AI to get suit candidate
    const suitCandidate = 'suit candidate';
    return suitCandidate;
  }
}
