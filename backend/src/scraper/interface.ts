export type ScrapePostParam = {
  from: Date;
  to: Date;
  postCount?: number;
};

export interface IScraper {
  scrapePosts(params: ScrapePostParam): Promise<void>;
}
