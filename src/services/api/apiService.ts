import { requestConfig } from "./config";
import { AxiosError, AxiosInstance } from "axios";
import { api } from ".";

export interface ServerError {
  statusCode: number;
  message: string;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
}

export interface ServerCreateResponse {
  _id: string;
  message: string;
}
export interface ServerUpdateResponse {
  _id: string;
  message: string;
  data: object;
}

export interface PaginatedData<Data> {
  first: number;
  prev: any;
  next: any;
  last: number;
  pages: number;
  items: number;
  data: Data[];
}

class apiService {
  protected api: AxiosInstance;
  protected path: string;

  constructor(api: AxiosInstance, path: string) {
    this.api = api;
    this.path = path;
  }

  public async getAll<T>(): Promise<PaginatedData<T>> {
    try {
      const response = await this.api.get(this.path, requestConfig(false));
      return response.data as PaginatedData<T>;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  public async getById<T>(id: string): Promise<T> {
    try {
      const response = await this.api.get(
        `${this.path}/${id}`,
        requestConfig(false)
      );

      return response.data as T;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  public static async search<T>(
    path: string,
    query: string
  ): Promise<PaginatedData<T>> {
    try {
      const response = await api.get(
        `${path}search?q=${query}`,
        requestConfig(false)
      );
      return response.data as PaginatedData<T>;
    } catch (error) {
      throw new Error(`Error searching data: ${error}`);
    }
  }

  public async create<T>(
    data: T
  ): Promise<AxiosError | ServerError | ServerCreateResponse> {
    try {
      const response = await this.api.post(this.path, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data as ServerCreateResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return error.response.data as ServerError;
      }
      throw error;
    }
  }

  public async update<T>(
    id: string,
    data: T
  ): Promise<AxiosError | ServerError | ServerUpdateResponse> {
    try {
      const response = await this.api.put(`${this.path}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
      });
      return response.data as ServerUpdateResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return error.response.data as ServerError;
      }
      throw error;
    }
  }

  public async delete(
    id: string
  ): Promise<AxiosError | ApiError | ServerCreateResponse> {
    try {
      const response = await this.api.delete(
        `${this.path}/${id}`,
        requestConfig(false)
      );
      return response.data as ServerCreateResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return error.response.data as ApiError;
      }
      throw error;
    }
  }
}

export default apiService;
