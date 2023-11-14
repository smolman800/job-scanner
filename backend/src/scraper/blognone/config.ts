const HEADERS = {
  authority: 'jobs-api.blognone.com',
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'content-type': 'application/json',
  origin: 'https://jobs.blognone.com',
  referer: 'https://jobs.blognone.com/',
  'sec-ch-ua':
    '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
};

// ---------------- Job Listing Settings ----------------
export const JOB_LISTING_CONFIG = {
  httpClientConfig: {
    method: 'GET',
    url: (pageNo: number) =>
      `https://jobs-api.blognone.com/search?page=${pageNo}`,
    headers: HEADERS,
    data: null,
  },
};
