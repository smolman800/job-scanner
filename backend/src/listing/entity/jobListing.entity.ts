import { AggregateRoot } from '@nestjs/cqrs';

export type JobListingProps = {
  id: string;
  platformId: string | null;
  pageUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  jobTitle: string;
  company: string;
  postDate: string;
  jobDescription: string[];
  benefit: string[];
  industry: string;
  vendorId: string;
  vendorName: string;
  vendorUrl: string;
};

export class JobListing extends AggregateRoot {
  private props: JobListingProps;

  constructor(props: JobListingProps) {
    super();
    this.props = props;
  }

  static hydrate(props: JobListingProps): JobListing {
    return new JobListing(props);
  }

  serialize(): JobListingProps {
    return this.props;
  }
}
