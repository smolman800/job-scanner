import { JobPost } from '../entity/jobPost.entity';
import { Vendor } from '../entity/vendor.entity';

export type JobDetailDTO = {
  platformId: string | null;
  pageUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  jobTitle: string;
  company: string;
  postDate: string;
  jobDescription: string[];
  benefit: string[];
  industry: string;
};

export type ScrapePostParam = {
  from: Date | null;
  to: Date | null;
  postCount?: number;
};

// TODO: add health check endpoint
// TODO: add checker if the response schema hasn't changed
export abstract class Scraper {
  abstract scrapePosts(params: ScrapePostParam): Promise<JobDetailDTO[]>;
}

export abstract class ScraperFactory {
  abstract create(vendor: Vendor): Scraper;
}

export abstract class VendorRepository {
  abstract create(vendor: Vendor): Promise<void>;
  abstract update(vendor: Vendor): Promise<void>;
  abstract get(id: string): Promise<Vendor>;
  abstract getMany(ids: string[]): Promise<Vendor[]>;
}

export abstract class JobPostRepository {
  abstract create(jobPost: JobPost[]): Promise<void>;
  abstract update(jobPost: JobPost[]): Promise<void>;
  abstract get(id: string): Promise<JobPost>;
  abstract getMany(ids: string[]): Promise<JobPost[]>;
}
