import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobPostAndVendorTable1693181142035
  implements MigrationInterface
{
  name = 'CreateJobPostAndVendorTable1693181142035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vendor" ("id" character varying(255) NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_post" ("id" character varying(255) NOT NULL, "platformId" character varying, "pageUrl" character varying NOT NULL, "salaryMin" double precision, "salaryMax" double precision, "currency" character varying, "jobTitle" character varying NOT NULL, "company" character varying NOT NULL, "postDate" character varying NOT NULL, "jobDescription" text array NOT NULL, "benefit" text array, "industry" character varying NOT NULL, "vendorId" character varying(255) NOT NULL, CONSTRAINT "PK_a70f902a85e6de57340d153c813" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD CONSTRAINT "FK_b742b544340da3a0a48cbd06d8a" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_post" DROP CONSTRAINT "FK_b742b544340da3a0a48cbd06d8a"`,
    );
    await queryRunner.query(`DROP TABLE "job_post"`);
    await queryRunner.query(`DROP TABLE "vendor"`);
  }
}
