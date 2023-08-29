import { Inject, Injectable } from '@nestjs/common';
import { JobPost } from '../entity/jobPost.entity';
import {
  ScraperFactory,
  JobDetailDTO,
  JobPostRepository,
  Scraper,
} from './interface';
import { JobsdbScraperService } from '../jobsdb/jobsdb.service';
import { Vendor, VendorId } from '../entity/vendor.entity';
import { CommandHandler } from '@nestjs/cqrs';

@Injectable()
export class ScraperFactoryImpl implements ScraperFactory {
  constructor(private readonly jobsdbScraper: JobsdbScraperService) {}

  create(vendor: Vendor): Scraper {
    switch (vendor.id) {
      case VendorId.JOBSDB:
        return this.jobsdbScraper;
      default:
        throw new Error('Invalid vendorId');
    }
  }
}

export class ScrapeJobCommand {
  constructor(public readonly vendor: Vendor) {}
}

@CommandHandler(ScrapeJobCommand)
export class ScrapeJobHandler {
  constructor(
    private readonly jobPostRepository: JobPostRepository,
    @Inject('Vendor')
    private readonly jobPostEntity: typeof JobPost,
    private readonly scraperFactory: ScraperFactory,
  ) {}

  async execute({ vendor }: ScrapeJobCommand) {
    const scraper = this.scraperFactory.create(vendor);
    const jobDetails: JobDetailDTO[] = await scraper.scrapePosts({
      from: null,
      to: null,
      postCount: 10,
    });

    const jobPostEntities = jobDetails.map((jobDetail) => {
      const id = `${jobDetail.platformId}-${vendor.id}`;
      return this.jobPostEntity.hydrate({
        id,
        platformId: jobDetail.platformId,
        pageUrl: jobDetail.pageUrl,
        salaryMin: jobDetail.salaryMin,
        salaryMax: jobDetail.salaryMax,
        currency: jobDetail.currency,
        jobTitle: jobDetail.jobTitle,
        company: jobDetail.company,
        postDate: jobDetail.postDate,
        jobDescription: jobDetail.jobDescription,
        benefit: jobDetail.benefit,
        industry: jobDetail.industry,
        vendorId: vendor.id,
      });
    });

    await this.jobPostRepository.create(jobPostEntities);
  }
}
