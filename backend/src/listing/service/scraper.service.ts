import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetVendorQuery } from 'src/scraper/application/query/getVendor.query';
import { ScraperService, VendorDto } from '../application/interface';

@Injectable()
export class ScraperServiceImpl implements ScraperService {
  constructor(private readonly queryBus: QueryBus) {}

  async getVendorById(id: string): Promise<VendorDto> {
    const [vendor] = await this.queryBus.execute<GetVendorQuery, VendorDto[]>(
      new GetVendorQuery([id]),
    );
    return vendor;
  }
}
