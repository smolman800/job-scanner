import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobListingTable1693382459603 implements MigrationInterface {
  name = 'CreateJobListingTable1693382459603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_listing" ("id" character varying(255) NOT NULL, "platformId" character varying NOT NULL, "pageUrl" character varying NOT NULL, "salaryMin" double precision, "salaryMax" double precision, "currency" character varying, "jobTitle" character varying NOT NULL, "company" character varying NOT NULL, "postDate" character varying NOT NULL, "jobDescription" text array NOT NULL, "benefit" text array, "industry" character varying NOT NULL, "vendorId" character varying NOT NULL, "vendorName" character varying NOT NULL, "vendorUrl" character varying NOT NULL, CONSTRAINT "PK_2c659754a57de984c7cd732c58f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_postDate_vendorId" ON "job_listing" ("postDate", "vendorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_postDate_jobTitle_vendorId" ON "job_listing" ("postDate", "jobTitle", "vendorId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_postDate_jobTitle_vendorId"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_postDate_vendorId"`);
    await queryRunner.query(`DROP TABLE "job_listing"`);
  }
}
