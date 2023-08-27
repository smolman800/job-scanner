import { Inject, Injectable } from '@nestjs/common';
import { IdGenerator } from 'src/shared/idGenerator.service';
import { JobPost } from '../entity/jobPost.entity';
import { JobDetailDTO, JobPostRepository, Scraper } from './interface';
import { JobsdbScraperService } from '../jobsdb/jobsdb.service';
import { Vendor, VendorId } from '../entity/vendor.entity';

@Injectable()
export class ScraperFactory {
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

@Injectable()
export class ScrapeJobUseCase {
  constructor(
    private readonly jobPostRepository: JobPostRepository,
    private readonly idGenerator: IdGenerator,
    @Inject('Vendor')
    private readonly jobPostEntity: typeof JobPost,
    private readonly scraperFactory: ScraperFactory,
  ) {}

  async execute(vendor: Vendor) {
    const scraper = this.scraperFactory.create(vendor);
    const jobDetails: JobDetailDTO[] = await scraper.scrapePosts({
      from: null,
      to: null,
      postCount: 10,
    });

    const jobPostEntities = jobDetails.map((jobDetail) => {
      const id = this.idGenerator.generate();
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
