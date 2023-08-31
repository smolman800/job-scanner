import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JobPostCreatedEvent } from 'src/scraper/entity/jobPost.entity';
import { JobListingRepository, ScraperService, VendorDto } from '../interface';
import { Inject } from '@nestjs/common';
import { JobListing } from '../../entity/jobListing.entity';

@EventsHandler(JobPostCreatedEvent)
export class CreateJobListingHandler
  implements IEventHandler<JobPostCreatedEvent>
{
  constructor(
    private readonly jobListingRepository: JobListingRepository,
    private readonly scraperService: ScraperService,
    @Inject('JobListing')
    private readonly jobListingEntity: typeof JobListing,
  ) {}

  async handle(event: JobPostCreatedEvent) {
    const vendor: VendorDto = await this.scraperService.getVendorById(
      event.jobPost.vendorId,
    );
    const jobListing = {
      ...event.jobPost,
      vendorName: vendor.name,
      vendorUrl: vendor.url,
    };
    await this.jobListingRepository.upsert([
      this.jobListingEntity.hydrate(jobListing),
    ]);
  }
}
