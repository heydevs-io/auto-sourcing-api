import { PARSER_API_URL } from '@environments';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Job } from 'bullmq';
import { plainToInstance } from 'class-transformer';
import { Candidate, CandidateJobMatch } from 'database/entities';
import { Repository } from 'typeorm';
import { MatchJobInputDto } from '../dto/queue.dto';
import { JOB_QUEUE_NAME, JOB_QUEUE_TASK } from './constants';

@Processor(JOB_QUEUE_NAME, {
  concurrency: 1,
})
export class JobConsumer extends WorkerHost {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(CandidateJobMatch)
    private readonly candidateJobMatchingRepository: Repository<CandidateJobMatch>,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case JOB_QUEUE_TASK.MATCH_JOB: {
        const { jobId, candidateId } = plainToInstance(
          MatchJobInputDto,
          job.data,
        );
        const jobData = await this.jobRepository.findOneBy({
          id: jobId,
        });

        try {
          const candidate = await this.candidateRepository.findOneBy({
            id: candidateId,
          });

          if (!candidate || !jobData) return;

          // Get job matching score
          const response = await axios.post(
            `${PARSER_API_URL}/cv-scoring/score-internal`,
            {
              jd: job,
              cv: {
                skills: candidate.skills,
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          const { data } = response.data;

          const existingResumeJobMatching =
            await this.candidateJobMatchingRepository.findOneBy({
              candidateId: candidate.id,
              jobId: jobData.id,
            });

          if (existingResumeJobMatching) {
            // Update job matching score
            existingResumeJobMatching.score = parseFloat(data.score);
            await this.candidateJobMatchingRepository.save(
              existingResumeJobMatching,
            );
          } else {
            // Save job matching score
            const candidateJobMatchingCreate =
              this.candidateJobMatchingRepository.create({
                candidateId: candidate.id,
                jobId: jobData.id,
                score: parseFloat(data.score),
              });

            await this.candidateJobMatchingRepository.save(
              candidateJobMatchingCreate,
            );
          }

          return response.data.data;
        } catch (error) {
          return null;
        }
      }
    }
  }
}
