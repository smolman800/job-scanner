import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AxiosHttpClientService,
  HttpClient,
} from 'src/shared/httpClient.service';
import {
  ScrapeJobHandler,
  ScraperFactoryImpl,
} from './application/command/scrapeJob.command';
import {
  JobPostRepository,
  ScraperFactory,
  VendorRepository,
} from './application/interface';
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
import { GetVendorHandler } from './application/query/getVendor.query';

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

const SERVICE = [
  JobsdbScraperService,
  {
    provide: ScraperFactory,
    useClass: ScraperFactoryImpl,
  },
  {
    provide: HttpClient,
    useClass: AxiosHttpClientService,
  },
];

const HANDLER = [ScrapeJobHandler, GetVendorHandler];

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
  providers: [...ENTITY, ...REPOSITORY, ...SERVICE, ...CONFIG, ...HANDLER],
})
export class ScraperModule {}
