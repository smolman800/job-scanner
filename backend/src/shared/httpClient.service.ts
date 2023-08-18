import { Injectable } from '@nestjs/common';
import axios from 'axios';

type Config = {
  method: string;
  headers: object;
};

export abstract class HttpClient {
  abstract get<T>(url: string, config?: Config): Promise<T>;
  abstract post<T>(url: string, body?: object, config?: any): Promise<T>;
  abstract patch<T>(url: string, body?: any, config?: any): Promise<T>;
  abstract delete<T>(url: string, config?: any): Promise<T>;
}

@Injectable()
export class AxiosHttpClientService implements HttpClient {
  async get<T>(url: string, config?: Config): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, body?: object, config?: Config): Promise<T> {
    const response = await axios.post<T>(url, body, config);
    return response.data;
  }

  async patch<T>(url: string, body?: object, config?: Config): Promise<T> {
    const response = await axios.patch<T>(url, body, config);
    return response.data;
  }

  async delete<T>(url: string, config?: Config): Promise<T> {
    const response = await axios.delete<T>(url, config);
    return response.data;
  }
}
