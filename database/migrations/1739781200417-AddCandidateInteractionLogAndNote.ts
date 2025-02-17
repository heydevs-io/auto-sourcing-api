import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCandidateInteractionLogAndNote1739781200417
  implements MigrationInterface
{
  name = 'AddCandidateInteractionLogAndNote1739781200417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "note" character varying NOT NULL, "candidate_id" character varying NOT NULL, "user_id" character varying NOT NULL, "candidateId" uuid, "userId" uuid, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."candidates_gender_enum"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" DROP COLUMN "date_of_birth"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" DROP COLUMN "cv_download_url"`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "total_yoe"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "title" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "linked_in_url" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "required_skills" character varying array`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_f2e509999f558327662512950f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_ed48d2e30a0bad4c816f778e3c9" PRIMARY KEY ("job_id", "candidate_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "connect_invitation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "connect_email" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" ALTER COLUMN "from_month" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" ALTER COLUMN "from_year" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "from_month" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "from_year" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "to_month" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "to_year" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ADD "description" text`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "keywords"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "keywords" character varying array`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "search_command"`);
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "search_command" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_ed48d2e30a0bad4c816f778e3c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_93cd5abc5ea3278574a069f278d" PRIMARY KEY ("job_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "candidate_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "candidate_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_93cd5abc5ea3278574a069f278d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_928e7d407c5ac17c61539cca5e8" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "job_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "job_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "UQ_9825651b59217f0f6d1743138a8" UNIQUE ("candidate_id", "job_id", "user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_9027c8f0ba75fbc1ac46647d043" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "FK_6737694707b89fdd6effcdfaaba" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "FK_abe64fbed8315a098ba95906031" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "FK_bd34a586cbf5262b441c69a4763" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_86f25510264633f285301bf8fa6" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" ADD CONSTRAINT "FK_44b15c2d8d96f37a1b100f0ed28" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_settings" DROP CONSTRAINT "FK_44b15c2d8d96f37a1b100f0ed28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_86f25510264633f285301bf8fa6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "FK_bd34a586cbf5262b441c69a4763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "FK_abe64fbed8315a098ba95906031"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "FK_6737694707b89fdd6effcdfaaba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_9027c8f0ba75fbc1ac46647d043"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "UQ_9825651b59217f0f6d1743138a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_settings" ADD "user_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "job_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "job_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_928e7d407c5ac17c61539cca5e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_93cd5abc5ea3278574a069f278d" PRIMARY KEY ("job_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "candidate_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "candidate_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_93cd5abc5ea3278574a069f278d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_ed48d2e30a0bad4c816f778e3c9" PRIMARY KEY ("job_id", "candidate_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "search_command"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "search_command" text`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "keywords"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "keywords" text array`);
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "to_year" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "to_month" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "from_year" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ALTER COLUMN "from_month" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" ALTER COLUMN "from_year" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" ALTER COLUMN "from_month" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "connect_email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "connect_invitation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP CONSTRAINT "PK_ed48d2e30a0bad4c816f778e3c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" ADD CONSTRAINT "PK_f2e509999f558327662512950f3" PRIMARY KEY ("job_id", "candidate_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_job_matches" DROP COLUMN "id"`,
    );
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "required_skills"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" DROP COLUMN "linked_in_url"`,
    );
    await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "total_yoe" smallint`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "cv_download_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "date_of_birth" date`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidates_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "gender" "public"."candidates_gender_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD "address" character varying`,
    );
    await queryRunner.query(`DROP TABLE "notes"`);
  }
}
