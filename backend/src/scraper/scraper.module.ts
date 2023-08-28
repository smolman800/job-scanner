import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AxiosHttpClientService,
  HttpClient,
} from 'src/shared/httpClient.service';
import { JobPostRepository, VendorRepository } from './application/interface';
import {
  ScrapeJobUseCase,
  ScraperFactory,
} from './application/scrapeJob.service';
import { JobPost } from './entity/jobPost.entity';
import { Vendor } from './entity/vendor.entity';
import { JobDetailsConfig, ListingConfig } from './interface';
import { JOB_DETAILS_CONFIG, JOB_LISTING_CONFIG } from './jobsdb/config';
import { JobsdbScraperService } from './jobsdb/jobsdb.service';
import {
  JobPostOrmEntity,
  JobPostTypeOrmRepository,
} from './repository/jobPost.repository';
import {
  VendorOrmEntity,
  VendorTypeOrmRepository,
} from './repository/vendor.repository';
import { ScraperController } from './scraper.controller';

const ENTITY = [
  {
    provide: 'Vendor',
    useValue: Vendor,
  },
  {
    provide: 'JobPost',
    useValue: JobPost,
  },
];

const REPOSITORY = [
  {
    provide: JobPostRepository,
    useClass: JobPostTypeOrmRepository,
  },
  {
    provide: VendorRepository,
    useClass: VendorTypeOrmRepository,
  },
];

const APPLICATION = [ScrapeJobUseCase];

const SERVICE = [
  JobsdbScraperService,
  ScraperFactory,
  {
    provide: HttpClient,
    useClass: AxiosHttpClientService,
  },
];

const CONFIG = [
  {
    provide: ListingConfig,
    useValue: JOB_LISTING_CONFIG,
  },
  {
    provide: JobDetailsConfig,
    useValue: JOB_DETAILS_CONFIG,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([VendorOrmEntity, JobPostOrmEntity])],
  controllers: [ScraperController],
  exports: [],
  providers: [...ENTITY, ...REPOSITORY, ...APPLICATION, ...SERVICE, ...CONFIG],
})
export class ScraperModule {}
