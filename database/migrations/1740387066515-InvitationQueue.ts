import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitationQueue1740387066515 implements MigrationInterface {
  name = 'InvitationQueue1740387066515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_settings" RENAME COLUMN "gmail_daily_limit" TO "mail_daily_limit"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invitation_queues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "candidate_id" uuid NOT NULL, "job_id" uuid NOT NULL, "sent_at" TIMESTAMP WITH TIME ZONE, "scheduled_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a1340a564828754bc23890e583f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" ADD CONSTRAINT "FK_250d28625c663948624f782e677" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" ADD CONSTRAINT "FK_704051138767be684c265d9793f" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" ADD CONSTRAINT "FK_a7db5dae0502284c7214b467fc8" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" DROP CONSTRAINT "FK_a7db5dae0502284c7214b467fc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" DROP CONSTRAINT "FK_704051138767be684c265d9793f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitation_queues" DROP CONSTRAINT "FK_250d28625c663948624f782e677"`,
    );
    await queryRunner.query(`DROP TABLE "invitation_queues"`);
    await queryRunner.query(
      `ALTER TABLE "account_settings" RENAME COLUMN "mail_daily_limit" TO "gmail_daily_limit"`,
    );
  }
}
