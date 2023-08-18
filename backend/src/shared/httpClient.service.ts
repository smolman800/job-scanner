import { Injectable } from '@nestjs/common';
import axios from 'axios';

type Config = {
  method: string;
  headers: object;
};

type Response<T> = {
  status: number;
  data: T;
};

export abstract class HttpClient {
  abstract get<T>(url: string, config?: Config): Promise<Response<T>>;
  abstract post<T>(
    url: string,
    body?: object,
    config?: any,
  ): Promise<Response<T>>;
  abstract patch<T>(
    url: string,
    body?: any,
    config?: any,
  ): Promise<Response<T>>;
  abstract delete<T>(url: string, config?: any): Promise<Response<T>>;
}

@Injectable()
export class AxiosHttpClientService implements HttpClient {
  async get<T>(url: string, config?: Config): Promise<Response<T>> {
    const response = await axios.get<T>(url, config);
    return response;
  }

  async post<T>(
    url: string,
    body?: object,
    config?: Config,
  ): Promise<Response<T>> {
    const response = await axios.post<T>(url, body, config);
    return response;
  }

  async patch<T>(
    url: string,
    body?: object,
    config?: Config,
  ): Promise<Response<T>> {
    const response = await axios.patch<T>(url, body, config);
    return response;
  }

  async delete<T>(url: string, config?: Config): Promise<Response<T>> {
    const response = await axios.delete<T>(url, config);
    return response;
  }
}
