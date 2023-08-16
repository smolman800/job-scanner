// ------ Job Listing Interface ------

export type JobListingAPIResponse = {
  data: JobListingData[];
};

type JobListingData = {
  jobs: Jobs;
};

type Jobs = {
  total: number;
  totalJobs: number;
  jobs: Job[];
};

type Job = {
  id: string;
  adType: string;
  sourceCountryCode: string;
  isStandout: boolean;
  companyMeta: CompanyMeta;
  jobTitle: string;
  jobUrl: string;
  jobTitleSlug: string;
  description: string;
  employmentType: EmploymentType;
  sellingPoints: string[];
  locations: ListingLocation[];
  categories: Category[];
  postingDuration: string;
  postedAt: string;
  salaryRange: SalaryRange;
  salaryVisible: boolean;
  bannerUrl: string;
  isClassified: boolean;
};

type CompanyMeta = {
  id: string;
  advertiserId: string;
  isPrivate: boolean;
  name: string;
  logoUrl: string;
  slug: string;
};

type EmploymentType = {
  code: string;
  name: string;
};

type ListingLocation = {
  code: string;
  name: string;
  slug: string;
};

type Category = {
  code: string;
  name: string;
};

type SalaryRange = {
  currency: string | null;
  max: number | null;
  min: number | null;
  period: string | null;
  term: string | null;
};

// ------ Job Details Interface ------

export type JobDetailsAPIResponse = {
  id: string;
  pageUrl: string;
  applyUrl: ApplyUrl;
  isExpired: boolean;
  accountNum: number;
  advertisementId: string;
  adType: string;
  header: Header;
  jobDetail: JobDetail;
  location: DetailLocation[];
  sourceCountry: string;
};

type ApplyUrl = {
  url: string;
  isExternal: boolean;
};

type Header = {
  salary: Salary;
  jobTitle: string;
  company: Company;
  expiration: number;
  postedDate: string;
  postedAt: string;
  isInternship: boolean;
};

type Salary = {
  max: number | null;
  min: number | null;
  type: string | null;
  currency: string | null;
};

type Company = {
  name: string;
  url: string;
  slug: string;
  advertiserId: string;
};

type JobDetail = {
  summary: string[];
  jobDescription: JobDescription;
  jobRequirement: JobRequirement;
};

type JobDescription = {
  html: string;
};

type JobRequirement = {
  careerLevel: string;
  yearsOfExperience: string;
  qualification: string;
  fieldOfStudy: string | null;
  industryValue: IndustryValue;
  skills: string | null;
  employmentType: string;
  languages: string | null;
  postedDate: string;
  closingDate: string | null;
  jobFunctionValue: JobFunctionValue[];
  benefits: string[];
};

type IndustryValue = {
  value: string;
  label: string;
};

type JobFunctionValue = {
  code: number;
  name: string;
  children: string | null;
};

type DetailLocation = {
  location: string;
  locationId: string;
  omnitureLocationId: string;
};
