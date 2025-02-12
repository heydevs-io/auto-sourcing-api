import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import {
  ParseJDescription,
  ParseJdResponseDto,
} from './dto/parse-jd-response.dto';

@Injectable()
export class ParseJdService {
  constructor(private readonly httpService: HttpService) {}

  async parseJdFromAiService(fileUrl: string): Promise<ParseJdResponseDto> {
    // Download the file from the URL
    const response = await lastValueFrom(
      this.httpService.post('', {
        documentUrl: fileUrl,
      }),
    );

    const { data } = response;
    const { description }: { description: ParseJDescription } = data;

    const resultDescription = `<p><strong>Summary: </strong></p><p>${description.summary}</p><p><strong>Language qualification: </strong></p><p>${description.languageQualification}</p><p><strong>Qualification required: </strong></p>${description.qualificationsRequired.map((item) => `<li>${item}</li>`).join('')}<p><strong>Responsibilities: </strong></p>${description.responsibilities.map((item) => `<li>${item}</li>`).join('')}`;

    const result = {
      ...data,
      locations:
        data.country && data.state
          ? [
              {
                country: data.country,
                state: data.state,
              },
            ]
          : [],
      description: resultDescription,
      totalYearOfExperience: data.totalYearsOfExperience,
      interviewReward: data.interviewingReward,
      screeningReward: data.qualifiedReward,
      minSalary: data.minimumSalary,
      maxSalary: data.maximumSalary,
    };

    return plainToInstance(ParseJdResponseDto, result, {
      enableImplicitConversion: true,
    });
  }
}
