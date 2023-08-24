import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobPostTable1692886283320 implements MigrationInterface {
    name = 'CreateJobPostTable1692886283320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platformId" character varying, "pageUrl" character varying NOT NULL, "salaryMin" double precision, "salaryMax" double precision, "currency" character varying, "jobTitle" character varying NOT NULL, "company" character varying NOT NULL, "postDate" character varying NOT NULL, "jobDescription" text array NOT NULL, "benefit" text array, "industry" character varying NOT NULL, "vendorId" character varying NOT NULL, "vendor_id" uuid, CONSTRAINT "PK_a70f902a85e6de57340d153c813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job_post" ADD CONSTRAINT "FK_5c6704c0917df5d14eef75ea52d" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_post" DROP CONSTRAINT "FK_5c6704c0917df5d14eef75ea52d"`);
        await queryRunner.query(`DROP TABLE "job_post"`);
    }

}
