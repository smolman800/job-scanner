import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobsdbRecordToVendorTable1693181171249
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO vendor (id, name, url) VALUES ('jobsdb', 'jobsDb', 'https://www.jobsdb.com/')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "vendor" WHERE "id" = 'jobsdb';
      `);
  }
}
