import { Injectable } from '@nestjs/common';
import {
  JobDetailDto,
  ScrapePostParam,
  Scraper,
} from '../application/interface';
import { JobListingAPIResponse } from './interface';
import { JOB_LISTING_CONFIG } from './config';
import { HttpClient } from '../../shared/httpClient.service';

// TODO add tests where necessary
@Injectable()
export class BlognoneScraperService implements Scraper {
  // TODO create module for each scraper service, so that config can be injected
  private readonly jobListingConfig = JOB_LISTING_CONFIG;
  constructor(private readonly httpClient: HttpClient) {}

  async scrapePosts({
    from = new Date(),
    to = new Date(),
    postCount = 10,
  }: ScrapePostParam): Promise<JobDetailDto[]> {
    this.validateParam({ from, to, postCount });
    const results: JobDetailDto[] = [];
    let pageNum = 1;

    const ids = new Set<string>();
    while (results.length < postCount) {
      const jobListings = await this.getListings(pageNum);
      if (jobListings.jobs.length === 0) {
        break;
      }
      for (const jobListing of jobListings.jobs) {
        const id = `${jobListing.company.slug}-${jobListing.slug}`;
        // TODO to test elimination of duplicate ids
        if (this.isDuplicatedId(id, ids)) {
          console.warn(`Duplicated id: ${id}`);
          continue;
        }
        results.push({
          platformId: id,
          pageUrl: `https://jobs.blognone.com/company/${jobListing.company.slug}/job/${jobListing.slug}`,
          salaryMin: jobListing.salary_min
            ? parseInt(jobListing.salary_min)
            : null,
          salaryMax: jobListing.salary_max
            ? parseInt(jobListing.salary_max)
            : null,
          currency: 'THB',
          jobTitle: jobListing.title,
          company: jobListing.company.name_en,
          postDate: jobListing.updated,
          jobDescription: jobListing.skills,
          benefit: [],
          industry: '',
        });
        if (results.length >= postCount) {
          break;
        }
      }
      pageNum += 1;
    }
    return results;
  }

  private isDuplicatedId(id: string, ids: Set<string>): boolean {
    const isDuplicate = ids.has(id);
    if (!isDuplicate) {
      ids.add(id);
    }
    return isDuplicate;
  }

  // TODO: perform DRY
  private validateParam(params: {
    from: Date | null;
    to: Date | null;
    postCount: number;
  }): void {
    if (params.from || params.to) {
      throw new Error('from and to are not supported yet');
    }
    if (params.postCount > 100) {
      throw new Error('postCount cannot be more than 100');
    }
  }

  private async getListings(pageNo = 1): Promise<JobListingAPIResponse> {
    const response = await this.httpClient.get<JobListingAPIResponse>(
      this.jobListingConfig.httpClientConfig.url(pageNo),
      {
        headers: this.jobListingConfig.httpClientConfig.headers,
      },
    );
    if (response.status != 200) {
      throw new Error('Failed to fetch  jobs listing from Blognone');
    }
    return response.data;
  }
}
