import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1739443704743 implements MigrationInterface {
  name = 'CreateDatabase1739443704743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DEACTIVATED', 'INACTIVE', 'LOCKED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "introduction" character varying, "status" "public"."users_status_enum" NOT NULL DEFAULT 'INACTIVE', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "country" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "UQ_bd3c6dd9f1ca5beaa8d6c97bd3d" UNIQUE ("country", "state"), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_location_country_state" ON "locations" ("country", "state") `,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'auto-sourcing',
        'public',
        'jobs',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', title)",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "keywords" text array NOT NULL, "search_command" text NOT NULL, "description" text NOT NULL, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', title)) STORED, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate_educations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "candidate_id" uuid NOT NULL, "institution" character varying NOT NULL, "degree" character varying NOT NULL, "from_month" smallint NOT NULL, "from_year" smallint NOT NULL, "to_month" smallint, "to_year" smallint, "is_current" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_926cb0760dd697b7b9a109adc6c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_languages_level_enum" AS ENUM('BASIC', 'CONVERSATIONAL', 'WORKING_PROFICIENCY', 'FLUENT', 'NATIVE_BILINGUAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate_languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "candidate_id" uuid NOT NULL, "language" character varying NOT NULL, "level" "public"."candidate_languages_level_enum", CONSTRAINT "PK_34dd59c43dc6bea95a7b172a849" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate_work_experiences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "candidate_id" uuid NOT NULL, "company_name" character varying NOT NULL, "position" character varying NOT NULL, "from_month" smallint NOT NULL, "from_year" smallint NOT NULL, "to_month" smallint NOT NULL, "to_year" smallint NOT NULL, "description" character varying NOT NULL, "is_current" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_134f34c81637d609ceff7f6197b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidates_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidates_phone_code_enum" AS ENUM('+84', '+1', '+93', '+358-18', '+355', '+213', '+1-684', '+376', '+244', '+1-264', '+672', '+1-268', '+54', '+374', '+297', '+61', '+43', '+994', '+973', '+880', '+1-246', '+375', '+32', '+501', '+229', '+1-441', '+975', '+591', '+599', '+387', '+267', '+0055', '+55', '+246', '+673', '+359', '+226', '+257', '+855', '+237', '+238', '+1-345', '+236', '+235', '+56', '+86', '+57', '+269', '+242', '+682', '+506', '+225', '+385', '+53', '+357', '+420', '+243', '+45', '+253', '+1-767', '+1-809', '+593', '+20', '+503', '+240', '+291', '+372', '+268', '+251', '+500', '+298', '+679', '+358', '+33', '+594', '+689', '+262', '+241', '+220', '+995', '+49', '+233', '+350', '+30', '+299', '+1-473', '+590', '+1-671', '+502', '+44-1481', '+224', '+245', '+592', '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353', '+972', '+39', '+1-876', '+81', '+44-1534', '+962', '+7', '+254', '+686', '+383', '+965', '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352', '+853', '+261', '+265', '+60', '+960', '+223', '+356', '+44-1624', '+692', '+596', '+222', '+230', '+52', '+691', '+373', '+377', '+976', '+382', '+1-664', '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+687', '+64', '+505', '+227', '+234', '+683', '+850', '+389', '+=1-670', '+47', '+968', '+92', '+680', '+970', '+507', '+675', '+595', '+51', '+63', '+870', '+48', '+351', '+1-787', '+974', '+40', '+250', '+290', '+1-869', '+1-758', '+508', '+1-784', '+685', '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1721', '+421', '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+1-242', '+670', '+228', '+690', '+676', '+1-868', '+216', '+90', '+993', '+1-649', '+688', '+256', '+380', '+971', '+44', '+598', '+998', '+678', '+379', '+58', '+1-284', '+1-340', '+681', '+967', '+260', '+263')`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'auto-sourcing',
        'public',
        'candidates',
        'GENERATED_COLUMN',
        'search_vector',
        "to_tsvector('simple', first_name || ' ' || last_name)",
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "candidates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "location_id" uuid NOT NULL, "email" character varying NOT NULL, "avatar" character varying, "address" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gender" "public"."candidates_gender_enum", "date_of_birth" date, "phone_code" "public"."candidates_phone_code_enum", "phone" character varying, "cv_download_url" character varying, "portfolio" character varying, "summary" character varying, "skills" character varying array, "total_yoe" smallint, "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', first_name || ' ' || last_name)) STORED, CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."candidate_job_matches_status_enum" AS ENUM('CONNECTED', 'REJECTED', 'SOURCED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "candidate_job_matches" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "candidate_id" character varying NOT NULL, "job_id" character varying NOT NULL, "score" integer, "status" "public"."candidate_job_matches_status_enum" NOT NULL DEFAULT 'SOURCED', "reject_reason" character varying, CONSTRAINT "PK_f2e509999f558327662512950f3" PRIMARY KEY ("candidate_id", "job_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying NOT NULL, "linked_in" character varying, "gmail" character varying, "linked_in_daily_limit" integer, "gmail_daily_limit" integer, CONSTRAINT "PK_cede89a31d2392a1064087af67a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" ADD CONSTRAINT "FK_574117b04c7dd033b654818051c" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_languages" ADD CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" ADD CONSTRAINT "FK_5f3ffd71a360a553a292e241b2a" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD CONSTRAINT "FK_f46af1b3e38b951569a8c1391f2" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidates" DROP CONSTRAINT "FK_f46af1b3e38b951569a8c1391f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_work_experiences" DROP CONSTRAINT "FK_5f3ffd71a360a553a292e241b2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_languages" DROP CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidate_educations" DROP CONSTRAINT "FK_574117b04c7dd033b654818051c"`,
    );
    await queryRunner.query(`DROP TABLE "account_settings"`);
    await queryRunner.query(`DROP TABLE "candidate_job_matches"`);
    await queryRunner.query(
      `DROP TYPE "public"."candidate_job_matches_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "candidates"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      [
        'GENERATED_COLUMN',
        'search_vector',
        'auto-sourcing',
        'public',
        'candidates',
      ],
    );
    await queryRunner.query(`DROP TYPE "public"."candidates_phone_code_enum"`);
    await queryRunner.query(`DROP TYPE "public"."candidates_gender_enum"`);
    await queryRunner.query(`DROP TABLE "candidate_work_experiences"`);
    await queryRunner.query(`DROP TABLE "candidate_languages"`);
    await queryRunner.query(
      `DROP TYPE "public"."candidate_languages_level_enum"`,
    );
    await queryRunner.query(`DROP TABLE "candidate_educations"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'auto-sourcing', 'public', 'jobs'],
    );
    await queryRunner.query(`DROP INDEX "public"."idx_location_country_state"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
  }
}
