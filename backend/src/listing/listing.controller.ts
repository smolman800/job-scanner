import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetListingQuery } from './application/query/getListing.query';
import { PaginateFormat } from './application/interface';
import { JobListingProps } from './entity/jobListing.entity';

@Controller('listing')
export class ListingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('')
  async getListing(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<PaginateFormat<JobListingProps>> {
    const listing = await this.queryBus.execute(
      new GetListingQuery(page, limit),
    );
    return listing;
  }
}
