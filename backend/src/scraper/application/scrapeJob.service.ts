import { Injectable } from '@nestjs/common';
import { IdGenerator } from 'src/shared/idGenerator.service';
import { JobPost } from '../entity/jobPost.entity';
import { JobDetailDTO, JobPostRepository, Scraper } from './interface';

@Injectable()
export class ScrapeJobUseCase {
  constructor(
    private readonly repository: JobPostRepository,
    private readonly idGenerator: IdGenerator,
    private readonly jobPostEntity: typeof JobPost,
  ) {}

  async execute(scraper: Scraper, vendorId: string) {
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
        vendorId,
      });
    });

    await this.repository.create(jobPostEntities);
  }
}
