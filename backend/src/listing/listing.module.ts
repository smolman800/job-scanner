import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperModule } from 'src/scraper/scraper.module';
import { CreateJobListingHandler } from './application/command/createJobListing.handler';
import { JobListingRepository, ScraperService } from './application/interface';
import { JobListing } from './entity/jobListing.entity';
import {
  JobListingOrmEntity,
  JobListingTypeOrmRepository,
} from './repository/jobListing.repository';
import { ScraperServiceImpl } from './service/scraper.service';
import { ListingController } from './listing.controller';
import { GetListingHandler } from './application/query/getListing.query';

@Module({
  imports: [ScraperModule, TypeOrmModule.forFeature([JobListingOrmEntity])],
  controllers: [ListingController],
  providers: [
    CreateJobListingHandler,
    GetListingHandler,
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
