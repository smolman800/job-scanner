import { JobListing, JobListingProps } from '../entity/jobListing.entity';

type ParamOption1 = {
  ids: string[];
};

type ParamOption2 = {
  from: Date;
  jobTitle?: string;
  vendorId?: string;
};

export type GetManyJobListingParam = ParamOption1 | ParamOption2;

export type PaginateFormat<T> = {
  items: T[];
  meta: {
    itemCount: number;
    totalItems?: number | undefined;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };
  links?: {
    first?: string | undefined;
    previous?: string | undefined;
    next?: string | undefined;
    last?: string | undefined;
  };
};

export abstract class JobListingRepository {
  abstract upsert(jobListing: JobListing[]): Promise<void>;
  abstract get(id: string): Promise<JobListing>;
  abstract getMany(param: GetManyJobListingParam): Promise<JobListing[]>;
  // TODO: revise any param
  abstract paginate(param: any): Promise<PaginateFormat<JobListingProps>>;
}

export type VendorDto = {
  id: string;
  name: string;
  url: string;
};

export abstract class ScraperService {
  abstract getVendorById(id: string): Promise<VendorDto>;
}
