import {
  JobDetailDTO,
  JobPostRepository,
  Scraper,
  ScraperFactory,
} from '../application/interface';
import { JobPost, JobPostProps } from '../entity/jobPost.entity';

export function createJobPostProps(
  overrides?: Partial<JobPostProps>,
): JobPostProps {
  return {
    id: 'id',
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
    vendorId: 'vendorId',
    ...overrides,
  };
}

export class InMemoryJobPostRepository implements JobPostRepository {
  jobPosts: JobPost[] = [];

  async create(jobPosts: JobPost[]): Promise<void> {
    this.jobPosts.push(...jobPosts);
  }

  async update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async get(): Promise<JobPost> {
    throw new Error('Method not implemented.');
  }

  async getMany(): Promise<JobPost[]> {
    throw new Error('Method not implemented.');
  }
}

export class MockedScraper implements Scraper {
  async scrapePosts(): Promise<JobDetailDTO[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, vendorId, ...props } = createJobPostProps();
    return [{ ...props }];
  }
}

export class MockedScraperFactory implements ScraperFactory {
  create(): Scraper {
    return new MockedScraper();
  }
}
