import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { VendorRepository } from './application/interface';
import { ScrapeJobCommand } from './application/command/scrapeJob.command';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly vendorRepository: VendorRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async scrapeJobs(@Body('id') id: string): Promise<void> {
    const vendor = await this.vendorRepository.get(id);
    await this.commandBus.execute<ScrapeJobCommand, void>(
      new ScrapeJobCommand(vendor),
    );
  }
}
