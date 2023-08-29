import { MockedHttpClient } from '../helper/test';
import { JobsdbScraperService } from './jobsdb.service';

describe('JobsdbScraperService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('scrapePosts should return 1 job post when getListings returns 2 posts', async () => {
    const scraper = new JobsdbScraperService(
      new MockedHttpClient(),
      {} as any,
      {} as any,
    );
    scraper['getListings'] = jest.fn().mockResolvedValue({
      data: {
        jobs: {
          jobs: [
            {
              id: '1',
            },
            {
              id: '2',
            },
          ],
        },
      },
    });
    scraper['getJobDetails'] = jest.fn().mockResolvedValue([
      {
        data: {
          jobDetail: {
            id: '1',
            pageUrl: 'https://www.jobsdb.com/sg/en/job/100003008478494',
            header: {
              salary: {
                min: 1000,
                max: 2000,
                currency: 'SGD',
              },
              jobTitle: 'Software Engineer',
              company: {
                name: 'Company A',
              },
              postedAt: '2021-08-27T17:58:07Z',
            },
            jobDetail: {
              summary: ['summary'],
              jobDescription: {
                html: '<li>jobDescription</li>',
              },
              jobRequirement: {
                employmentType: 'Full Time',
                careerLevel: 'Entry Level',
                benefits: ['benefit'],
                industryValue: {
                  label: 'industry',
                },
              },
            },
          },
        },
      },
      {
        data: {
          jobDetail: {
            id: '2',
            pageUrl: 'https://www.jobsdb.com/sg/en/job/100003008478494',
            header: {
              salary: {
                min: 1000,
                max: 2000,
                currency: 'SGD',
              },
              jobTitle: 'Software Engineer',
              company: {
                name: 'Company A',
              },
              postedAt: '2021-08-27T17:58:07Z',
            },
            jobDetail: {
              summary: ['summary'],
              jobDescription: {
                html: '<li>jobDescription</li>',
              },
              jobRequirement: {
                employmentType: 'Full Time',
                careerLevel: 'Entry Level',
                benefits: ['benefit'],
                industryValue: {
                  label: 'industry',
                },
              },
            },
          },
        },
      },
    ]);

    const result = await scraper.scrapePosts({
      from: null,
      to: null,
      postCount: 1,
    });

    expect(result).toHaveLength(1);
  });

  test('scrapePosts should return maximum post when getListings returns lesser than requested posts', async () => {
    const scraper = new JobsdbScraperService(
      new MockedHttpClient(),
      {} as any,
      {} as any,
    );
    scraper['getListings'] = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          jobs: {
            jobs: [
              {
                id: '1',
              },
            ],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          jobs: {
            jobs: [],
          },
        },
      });
    scraper['getJobDetails'] = jest.fn().mockResolvedValue([
      {
        data: {
          jobDetail: {
            id: '1',
            pageUrl: 'https://www.jobsdb.com/sg/en/job/100003008478494',
            header: {
              salary: {
                min: 1000,
                max: 2000,
                currency: 'SGD',
              },
              jobTitle: 'Software Engineer',
              company: {
                name: 'Company A',
              },
              postedAt: '2021-08-27T17:58:07Z',
            },
            jobDetail: {
              summary: ['summary'],
              jobDescription: {
                html: '<li>jobDescription</li>',
              },
              jobRequirement: {
                employmentType: 'Full Time',
                careerLevel: 'Entry Level',
                benefits: ['benefit'],
                industryValue: {
                  label: 'industry',
                },
              },
            },
          },
        },
      },
    ]);

    const result = await scraper.scrapePosts({
      from: null,
      to: null,
      postCount: 2,
    });

    expect(result).toHaveLength(1);
  });
});
