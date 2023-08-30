import { AggregateRoot } from '@nestjs/cqrs';

export type JobPostProps = {
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
};

export class JobPostCreatedEvent {
  constructor(public readonly jobPost: JobPostProps) {}
}

export class JobPost extends AggregateRoot {
  private props: JobPostProps;
  private acceptedCurrencies = ['THB'];
  constructor(props: JobPostProps) {
    super();
    this.validateSalary(props.salaryMin, props.salaryMax);
    this.validateJobTitle(props.jobTitle);
    this.validateCurrency(props.currency, props.salaryMin, props.salaryMax);
    this.validatePostDate(props.postDate);
    this.props = props;
  }

  static create(props: Omit<JobPostProps, 'id'>, id: string): JobPost {
    const jobPost = new JobPost({
      ...props,
      id,
    });
    jobPost.apply(new JobPostCreatedEvent(jobPost.serialize()));
    return jobPost;
  }

  static hydrate(props: JobPostProps): JobPost {
    return new JobPost(props);
  }

  private validateSalary(
    salaryMin: JobPostProps['salaryMin'],
    salaryMax: JobPostProps['salaryMax'],
  ): void {
    if (salaryMin && salaryMin < 0) {
      throw new Error('salaryMin must be positive');
    }
    if (salaryMax && salaryMax < 0) {
      throw new Error('salaryMax must be positive');
    }
    if (salaryMin && salaryMax) {
      if (salaryMin > salaryMax) {
        throw new Error('salaryMin must be less than salaryMax');
      }
    }
  }

  private validateJobTitle(jobTitle: string): void {
    if (jobTitle === '') {
      throw new Error('jobTitle cannot be empty');
    }
  }

  private validateCurrency(
    currency: string | null,
    salaryMin: number | null,
    salaryMax: number | null,
  ): void {
    if (currency === null) {
      if (salaryMin || salaryMax) {
        throw new Error(
          'currency cannot be null if salaryMin or salaryMax is not null',
        );
      }
    } else if (!this.acceptedCurrencies.includes(currency)) {
      throw new Error(`currency: ${currency}, is not supported`);
    }
  }

  private validatePostDate(postDate: string): void {
    const date = new Date(postDate);
    if (isNaN(date.getTime())) {
      throw new Error('postDate must be a valid date');
    }
  }

  serialize(): JobPostProps {
    return this.props;
  }

  get id(): string {
    return this.props.id;
  }
}
