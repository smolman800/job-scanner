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
import { GetVendorHandler } from './application/query/getVendor.query';
import { BlognoneScraperService } from './blognone/blognone.service';
import { JobPost } from './entity/jobPost.entity';
import { Vendor } from './entity/vendor.entity';
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

const SERVICE = [
  JobsdbScraperService,
  BlognoneScraperService,
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

@Module({
  imports: [TypeOrmModule.forFeature([VendorOrmEntity, JobPostOrmEntity])],
  controllers: [ScraperController],
  providers: [...ENTITY, ...REPOSITORY, ...SERVICE, ...HANDLER],
})
export class ScraperModule {}
