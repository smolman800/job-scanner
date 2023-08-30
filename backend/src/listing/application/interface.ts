import { JobListing } from '../entity/jobListing.entity';

type ParamOption1 = {
  ids: string[];
};

type ParamOption2 = {
  from: Date;
  jobTitle?: string;
  vendorId?: string;
};

export type GetManyJobListingParam = ParamOption1 | ParamOption2;

export abstract class JobListingRepository {
  abstract upsert(jobListing: JobListing[]): Promise<void>;
  abstract get(id: string): Promise<JobListing>;
  abstract getMany(param: GetManyJobListingParam): Promise<JobListing[]>;
}

export type VendorDto = {
  id: string;
  name: string;
  url: string;
};

export abstract class ScraperService {
  abstract getVendorById(id: string): Promise<VendorDto>;
}
