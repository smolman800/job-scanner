import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBlognoneRecordToVendorTable1695285376905
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO vendor (id, name, url) VALUES ('blognone', 'blognone', 'https://www.jobs.blognone.com/')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "vendor" WHERE "id" = 'blognone';
      `);
  }
}
