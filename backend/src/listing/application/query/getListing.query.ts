import { QueryHandler } from '@nestjs/cqrs';
import { JobListingRepository, PaginateFormat } from '../interface';
import { JobListingProps } from 'src/listing/entity/jobListing.entity';

export class GetListingQuery {
  constructor(
    public readonly page = 1,
    public readonly limit = 10,
  ) {}
}

@QueryHandler(GetListingQuery)
export class GetListingHandler {
  constructor(private readonly jobListingRepository: JobListingRepository) {}

  async execute({
    page,
    limit,
  }: GetListingQuery): Promise<PaginateFormat<JobListingProps>> {
    const listings = await this.jobListingRepository.paginate({ page, limit });
    return listings;
  }
}
