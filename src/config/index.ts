import DatabaseConfig from './db.config';
import LogConfig from './log.config';
import AiParseJdConfig from './ai-parse-jd.config';
import BullConfig from './bull.config';
import AwsS3Config from './aws-s3.config';
const configurations = [
  DatabaseConfig,
  LogConfig,
  AiParseJdConfig,
  AwsS3Config,
];

export {
  configurations,
  DatabaseConfig,
  LogConfig,
  AiParseJdConfig,
  BullConfig,
  AwsS3Config,
};
