import { SourcingApiResponse } from '@decorators';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { ParseJdBodyDto } from './dto';
import { ParseJdResponseDto } from './dto/parse-jd-response.dto';
import { ParseJdService } from './parse-jd.service';
import { SourcingBadRequestException } from '@exceptions';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('Parse JD')
@Controller('parser')
export class ParseJdController {
  constructor(private readonly parseJdService: ParseJdService) {}

  @HttpCode(HttpStatus.OK)
  @Post('jd')
  @SourcingApiResponse(ParseJdResponseDto)
  async parseJd(@Body() body: ParseJdBodyDto): Promise<ParseJdResponseDto> {
    const { url } = body;
    if (!url) {
      throw new SourcingBadRequestException('Invalid input');
    }

    return this.parseJdService.parseJdFromAiService(url);
  }
}
