import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { JobListingOrmEntity } from 'src/listing/repository/jobListing.repository';
import { JobPostOrmEntity } from 'src/scraper/repository/jobPost.repository';
import { VendorOrmEntity } from 'src/scraper/repository/vendor.repository';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [VendorOrmEntity, JobPostOrmEntity, JobListingOrmEntity],
  migrations: ['migration/*.ts'],
  logging: true,
});
