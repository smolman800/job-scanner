import { Injectable } from '@nestjs/common';

import { HttpClient } from '../../shared/httpClient.service';
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
  JobDetailDto,
  ScrapePostParam,
  Scraper,
} from '../application/interface';
import { JOB_DETAILS_CONFIG, JOB_LISTING_CONFIG } from './config';

// TODO: offload scraping to background worker thread
@Injectable()
export class JobsdbScraperService implements Scraper {
  private readonly jobListingsConfig = JOB_LISTING_CONFIG;
  private readonly jobDetailsConfig = JOB_DETAILS_CONFIG;
  constructor(private readonly httpClient: HttpClient) {}

  async scrapePosts({
    from = new Date(),
    to = new Date(),
    postCount = 10,
  }: ScrapePostParam): Promise<JobDetailDto[]> {
    this.validateParam({ from, to, postCount });
    const results: JobDetailDto[] = [];
    let pageNum = 1;

    while (results.length < postCount) {
      const jobListings = await this.getListings(pageNum);
      if (jobListings.data.jobs.jobs.length === 0) {
        break;
      }
      const jobDetails = await this.getJobDetails(jobListings);
      for (const jobDetail of jobDetails) {
        const dataOfInterest = jobDetail.data.jobDetail;
        const jobPost: JobDetailDto = {
          platformId: dataOfInterest.id,
          pageUrl: dataOfInterest.pageUrl,
          salaryMin: dataOfInterest.header.salary.min
            ? parseInt(dataOfInterest.header.salary.min)
            : null,
          salaryMax: dataOfInterest.header.salary.max
            ? parseInt(dataOfInterest.header.salary.max)
            : null,
          currency: dataOfInterest.header.salary.currency,
          jobTitle: dataOfInterest.header.jobTitle,
          company: dataOfInterest.header.company.name,
          postDate: dataOfInterest.header.postedAt,
          jobDescription: this.extractJobDescription(dataOfInterest.jobDetail),
          benefit: dataOfInterest.jobDetail.jobRequirement.benefits,
          industry:
            dataOfInterest.jobDetail.jobRequirement.industryValue.label || '',
        };
        results.push(jobPost);
        if (results.length >= postCount) {
          break;
        }
      }
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
