import { AiParseJdConfig } from '@config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ParseJdController } from './parse-jd.controller';
import { ParseJdService } from './parse-jd.service';
import { JobModule } from '../job/job.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [AiParseJdConfig.KEY],
      useFactory: (aiParseJdConfig: ConfigType<typeof AiParseJdConfig>) => {
        const { baseURL } = aiParseJdConfig;
        return {
          baseURL,
        };
      },
    }),
    JobModule,
  ],
  controllers: [ParseJdController],
  providers: [ParseJdService],
})
export class ParseJdModule {}
