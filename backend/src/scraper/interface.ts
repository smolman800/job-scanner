export abstract class ListingConfig {
  httpClientConfig: {
    url: string;
    method: string;
    headers: object;
    data: any;
  };
}

export abstract class JobDetailsConfig {
  httpClientConfig: {
    url: string;
    method: string;
    headers: object;
    data: any;
  };
}
