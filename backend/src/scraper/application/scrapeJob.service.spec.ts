import { JobPost } from '../entity/jobPost.entity';
import { Vendor, VendorId } from '../entity/vendor.entity';
import {
  InMemoryJobPostRepository,
  MockedScraperFactory,
} from '../helper/test';
import { ScrapeJobUseCase } from './scrapeJob.service';

describe('ScrapeJobUseCase', () => {
  test('execute should save jobPosts to repository', async () => {
    const jobPostRepository = new InMemoryJobPostRepository();
    const scraperFactory = new MockedScraperFactory();
    const useCase = new ScrapeJobUseCase(
      jobPostRepository,
      JobPost,
      scraperFactory,
    );
    const vendor = Vendor.hydrate({
      id: VendorId.JOBSDB,
      name: 'Jobsdb',
      url: 'https://th.jobsdb.com',
    });
    await useCase.execute(vendor);
    expect(jobPostRepository.jobPosts.length).toBe(1);
    expect(jobPostRepository.jobPosts[0]).toEqual(
      JobPost.hydrate({
        id: 'platformId-jobsdb',
        platformId: 'platformId',
        pageUrl: 'pageUrl',
        salaryMin: 10000,
        salaryMax: 20000,
        currency: 'THB',
        jobTitle: 'jobTitle',
        company: 'company',
        postDate: '2023-08-27T17:58:07Z',
        jobDescription: ['jobDescription'],
        benefit: ['benefit'],
        industry: 'industry',
        vendorId: VendorId.JOBSDB,
      }),
    );
  });
});
