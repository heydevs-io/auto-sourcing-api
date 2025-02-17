import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'database/entities';
import {
  CurrentUser,
  SourcingApiPaginatedResponse,
  SourcingApiResponse,
} from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards';
import {
  MessageResponseDto,
  JobDeletedResponseDto,
  JobDto,
  JobUpdatedResponseDto,
  UpdateJobDto,
  CandidateUpdatedResponseDto,
  UpdateCandidateStatusDto,
  SendInvitationDto,
} from './dto';
import { JobService } from './job.service';
import { CreateCandidateDto } from '../candidate/dto';
import { AnalyzeSearchCommandResponseDto, ImportJobDto } from './dto';
import { PageDto, PageOptionsDto } from '@dtos';
import { CandidateDto } from '../candidate/dto/candidate.dto';

@Controller('job')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @SourcingApiPaginatedResponse(JobDto)
  async getAll(
    @Query() pageOptions: PageOptionsDto,
    @CurrentUser() user: User,
  ): Promise<PageDto<JobDto>> {
    return await this.jobService.getAll(pageOptions, user.id);
  }

  @Get(':id')
  @SourcingApiResponse(JobDto)
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Delete(':id')
  @SourcingApiResponse(JobDeletedResponseDto)
  delete(@Param('id') id: string) {
    return this.jobService.delete(id);
  }

  @Post(':id/save-candidate')
  @SourcingApiResponse(MessageResponseDto)
  saveCandidate(
    @Param('id') id: string,
    @Body() data: CreateCandidateDto,
    @CurrentUser() user: User,
  ): Promise<MessageResponseDto> {
    return this.jobService.saveCandidate(id, data, user.id);
  }

  @Get(':id/analyze-search-command')
  @SourcingApiResponse(AnalyzeSearchCommandResponseDto)
  analyzeSearchCommand(
    @Param('id') id: string,
  ): Promise<AnalyzeSearchCommandResponseDto> {
    return this.jobService.analyzeSearchCommand(id);
  }

  @Post('import')
  @SourcingApiResponse(JobDto)
  import(
    @Body() data: ImportJobDto,
    @CurrentUser() user: User,
  ): Promise<JobDto> {
    return this.jobService.importJob(data, user.id);
  }

  @Put(':id')
  @SourcingApiResponse(JobUpdatedResponseDto)
  update(
    @Param('id') id: string,
    @Body() data: UpdateJobDto,
  ): Promise<JobUpdatedResponseDto> {
    return this.jobService.update(id, data);
  }

  @Put(':id/candidate/:candidateId/update-status')
  @SourcingApiResponse(CandidateUpdatedResponseDto)
  updateCandidateStatus(
    @Param('id') id: string,
    @Param('candidateId') candidateId: string,
    @Body() data: UpdateCandidateStatusDto,
  ): Promise<CandidateUpdatedResponseDto> {
    return this.jobService.updateCandidateStatus(id, candidateId, data);
  }

  @Get(':id/candidates')
  @SourcingApiPaginatedResponse(CandidateDto)
  getCandidates(
    @Param('id') id: string,
    @Query() pageOptions: PageOptionsDto,
  ): Promise<PageDto<CandidateDto>> {
    return this.jobService.getCandidates(id, pageOptions);
  }

  @Post(':id/send-invitation')
  @SourcingApiResponse(MessageResponseDto)
  sendInvitation(
    @Param('id') id: string,
    @Body() data: SendInvitationDto,
    @CurrentUser() user: User,
  ): Promise<MessageResponseDto> {
    return this.jobService.sendInvitation(id, data, user.id);
  }
}
