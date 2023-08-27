import { Body, Controller, Post } from '@nestjs/common';
import { ScrapeJobUseCase } from './application/scrapeJob.service';
import { VendorRepository } from './application/interface';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scrapeJobUseCase: ScrapeJobUseCase,
    private readonly vendorRepository: VendorRepository,
  ) {}

  @Post()
  async scrapeJobs(@Body('id') id: string): Promise<void> {
    const vendor = await this.vendorRepository.get(id);
    await this.scrapeJobUseCase.execute(vendor);
  }
}
