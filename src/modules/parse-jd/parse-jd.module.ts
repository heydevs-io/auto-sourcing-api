import { AiParseJdConfig } from '@config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ParseJdService } from './parse-jd.service';

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
  ],
  providers: [ParseJdService],
  exports: [ParseJdService],
})
export class ParseJdModule {}
