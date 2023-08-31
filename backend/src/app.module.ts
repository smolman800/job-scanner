import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VendorOrmEntity } from './scraper/repository/vendor.repository';
import { JobPostOrmEntity } from './scraper/repository/jobPost.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ListingModule } from './listing/listing.module';
import { JobListingOrmEntity } from './listing/repository/jobListing.repository';

@Module({
  imports: [
    CqrsModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [VendorOrmEntity, JobPostOrmEntity, JobListingOrmEntity],
        synchronize: false,
      }),
    }),
    ScraperModule,
    ListingModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
