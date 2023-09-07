export type Listing = {
  id: string;
  platformId: string;
  pageUrl: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
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

export type Meta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type ListingResponse = {
  items: Listing[];
  meta: Meta;
};
