import { Controller, Get, Param } from '@nestjs/common';
import { LinkedInService } from './linked-in.service';

@Controller('linked-in')
export class LinkedInController {
  constructor(private readonly linkedInService: LinkedInService) {}

  @Get('search-command/:jobId')
  generateSearchCommand(@Param('jobId') jobId: string) {
    return this.linkedInService.generateSearchCommand(jobId);
  }

  @Get('suit-candidate/:jobId')
  getSuitCandidate(@Param('jobId') jobId: string) {
    return this.linkedInService.getSuitCandidate(jobId);
  }
}
