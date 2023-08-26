import { Injectable } from '@nestjs/common';

import { JobDetailsConfig, ListingConfig } from 'src/scraper/interface';
import { HttpClient } from 'src/shared/httpClient.service';
import {
  JobDescription,
  JobDetail,
  JobDetailsAPIResponse,
  JobListingAPIResponse,
  JobRequirement,
} from './interface';
// TODO: abstract html parser and inject it into JobsdbScraperService
import * as cheerio from 'cheerio';
import {
  JobDetailDTO,
  ScrapePostParam,
  Scraper,
} from '../application/interface';

// TODO: offload scraping to background worker thread
@Injectable()
export class JobsdbScraperService implements Scraper {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jobListingsConfig: ListingConfig,
    private readonly jobDetailsConfig: JobDetailsConfig,
  ) {}

  async scrapePosts({
    from = new Date(),
    to = new Date(),
    postCount = 10,
  }: ScrapePostParam): Promise<JobDetailDTO[]> {
    this.validateParam({ from, to, postCount });
    const results: JobDetailDTO[] = [];
    let pageNum = 1;

    // TODO add tests for all possible breaking cases
    while (results.length < postCount) {
      const jobListings = await this.getListings(pageNum);
      if (jobListings.data.jobs.jobs.length === 0) {
        // TODO: add logger.warning to indicate that there are no more jobs to scrape
        break;
      }
      const jobDetails = await this.getJobDetails(jobListings);
      jobDetails.forEach((jobDetail) => {
        const jobPost: JobDetailDTO = {
          platformId: jobDetail.id,
          pageUrl: jobDetail.pageUrl,
          salaryMin: jobDetail.header.salary.min,
          salaryMax: jobDetail.header.salary.max,
          currency: jobDetail.header.salary.currency,
          jobTitle: jobDetail.header.jobTitle,
          company: jobDetail.header.company.name,
          postDate: jobDetail.header.postedAt,
          jobDescription: this.extractJobDescription(jobDetail.jobDetail),
          benefit: jobDetail.jobDetail.jobRequirement.benefits,
          industry:
            jobDetail.jobDetail.jobRequirement.industryValue.label || '',
        };
        results.push(jobPost);
      });
      pageNum += 1;
    }
    return results;
  }

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

  private async getJobDetails(
    listings: JobListingAPIResponse,
  ): Promise<JobDetailsAPIResponse[]> {
    const jobDetailsPromise = listings.data.jobs.jobs.map(async (job) => {
      try {
        const jobDetail = await this.getJobDetail(job.id);
        return jobDetail;
      } catch (error) {
        return null;
      }
    });
    const jobDetails = await Promise.all(jobDetailsPromise);
    const result = jobDetails.filter(
      (jobDetail): jobDetail is JobDetailsAPIResponse => jobDetail !== null,
    );
    return result;
  }

  private async getListings(pageNo = 1): Promise<JobListingAPIResponse> {
    const response = await this.httpClient.post<JobListingAPIResponse>(
      this.jobListingsConfig.httpClientConfig.url,
      this.jobListingsConfig.httpClientConfig.data(pageNo),
      {
        headers: this.jobListingsConfig.httpClientConfig.headers,
      },
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch jobs listing from JobsDB');
    }
    return response.data;
  }

  private extractJobDescription(jobDetail: JobDetail): string[] {
    const result: string[] = [];
    const jobSummary = jobDetail.summary;
    const jobDescription = jobDetail.jobDescription;
    const jobRequirement = jobDetail.jobRequirement;

    result.push(
      ...jobSummary,
      ...this.extractJobDescriptionItems(jobDescription),
      ...this.extractJobRequirementItems(jobRequirement),
    );

    return result;
  }

  private extractJobDescriptionItems(jobDescription: JobDescription): string[] {
    const result: string[] = [];
    const html = jobDescription.html;
    const $ = cheerio.load(html);
    $('li').each((_, element) => {
      result.push($(element).text());
    });
    return result;
  }

  private extractJobRequirementItems(jobRequirement: JobRequirement): string[] {
    const result: string[] = [];
    if (
      jobRequirement.employmentType !== null &&
      jobRequirement.employmentType !== ''
    ) {
      result.push(jobRequirement.employmentType);
    }
    if (
      jobRequirement.careerLevel !== null &&
      jobRequirement.careerLevel !== ''
    ) {
      result.push(jobRequirement.careerLevel);
    }
    return result;
  }

  private async getJobDetail(jobId: string): Promise<JobDetailsAPIResponse> {
    const response = await this.httpClient.post<JobDetailsAPIResponse>(
      this.jobDetailsConfig.httpClientConfig.url,
      this.jobDetailsConfig.httpClientConfig.data(jobId),
      {
        headers: this.jobDetailsConfig.httpClientConfig.headers,
      },
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch jobs details');
    }
    return response.data;
  }
}