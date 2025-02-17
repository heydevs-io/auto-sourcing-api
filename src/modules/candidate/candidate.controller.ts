import { Body, Controller, Param, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { CandidateService } from './candidate.service';
import { CandidateDto, CheckLinkedInDto, CheckLinkedInResponse } from './dto';
import { CurrentUser, SourcingApiResponse } from '@decorators';
import { User } from 'database/entities';
import { CandidateInteractionLogDto } from './dto/interaction-log.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('check-linkedin')
  @SourcingApiResponse(CheckLinkedInResponse)
  async checkLinkedIn(
    @Body() body: CheckLinkedInDto,
  ): Promise<CheckLinkedInResponse> {
    return this.candidateService.checkLinkedIn(body);
  }

  @Get(':id')
  @SourcingApiResponse(CandidateDto)
  async getCandidate(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<CandidateDto> {
    return this.candidateService.getCandidate(id, user.id);
  }

  @Get(':id/interaction-logs')
  @SourcingApiResponse(CandidateInteractionLogDto)
  async getInteractionLogs(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<CandidateInteractionLogDto[]> {
    return this.candidateService.getInteractionLogs(id, user.id);
  }
}
