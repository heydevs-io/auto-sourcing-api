import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  UpdateJobDto,
  SaveCandidateDto,
  SaveCandidateResponseDto,
} from './dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobService.delete(id);
  }

  @Post(':id/save-candidate')
  saveCandidate(
    @Param('id') id: string,
    @Body() data: SaveCandidateDto,
  ): Promise<SaveCandidateResponseDto> {
    return this.jobService.saveCandidate(id, data);
  }
}
