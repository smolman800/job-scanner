import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperModule } from 'src/scraper/scraper.module';
import { CreateJobListingHandler } from './application/createJobListing.handler';
import { JobListingRepository, ScraperService } from './application/interface';
import { JobListing } from './entity/jobListing.entity';
import {
  JobListingOrmEntity,
  JobListingTypeOrmRepository,
} from './repository/jobListing.repository';
import { ScraperServiceImpl } from './service/scraper.service';

@Module({
  imports: [ScraperModule, TypeOrmModule.forFeature([JobListingOrmEntity])],
  providers: [
    CreateJobListingHandler,
    {
      provide: ScraperService,
      useClass: ScraperServiceImpl,
    },
    {
      provide: 'JobListing',
      useValue: JobListing,
    },
    {
      provide: JobListingRepository,
      useClass: JobListingTypeOrmRepository,
    },
  ],
})
export class ListingModule {}
