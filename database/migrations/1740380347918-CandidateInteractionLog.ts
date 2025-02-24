import { MigrationInterface, QueryRunner } from 'typeorm';

export class CandidateInteractionLog1740380347918
  implements MigrationInterface
{
  name = 'CandidateInteractionLog1740380347918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "candidate_interaction_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "candidate_id" uuid NOT NULL, "job_id" uuid NOT NULL, "log" character varying NOT NULL, CONSTRAINT "PK_f2be707396a9a7fc20418c64f5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" 
      ALTER COLUMN "description" SET DATA TYPE VARCHAR`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" ADD CONSTRAINT "FK_e096baf2bf46525c743a8139048" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" ADD CONSTRAINT "FK_f6383b7084d2756b71791bf7074" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" ADD CONSTRAINT "FK_02fd0b870f769e2eb72d53d8b8d" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" DROP CONSTRAINT "FK_02fd0b870f769e2eb72d53d8b8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" DROP CONSTRAINT "FK_f6383b7084d2756b71791bf7074"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_interaction_logs" DROP CONSTRAINT "FK_e096baf2bf46525c743a8139048"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" 
        ALTER COLUMN "description" SET DATA TYPE TEXT`,
    );
    await queryRunner.query(`DROP TABLE "candidate_interaction_logs"`);
  }
}
