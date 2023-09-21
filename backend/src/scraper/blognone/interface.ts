// ------ Job Listing Interface ------

export type JobListingAPIResponse = {
  page: number;
  per_page: number;
  jobs: Job[];
  jobs_count: number;
};

type Job = {
  slug: string;
  company: Company;
  title: string;
  type: string;
  province: string;
  district: string;
  level: string;
  salary_min: string;
  salary_max: string;
  salary_display_format: string;
  skills: string[];
  premium: boolean;
  updated: string;
};

type Company = {
  slug: string;
  name_en: string;
  name_th: string;
  logo: string;
}
