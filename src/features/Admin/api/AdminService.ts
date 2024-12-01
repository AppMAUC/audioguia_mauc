import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { api } from "../../../services/api";
import { requestConfig } from "../../../services/api/config";
import {
  ApiError,
  ServerCreateResponse,
  ServerError,
  ServerUpdateResponse,
} from "../../../services/api/apiService";
import { Admin } from "../types/Admin";

class AdminAPI {
  private api: AxiosInstance;
  private path = "/admin";

  constructor() {
    this.api = api;
  }

  public async getAll(): Promise<Admin[]> {
    try {
      const response = await this.api.get(this.path, requestConfig(false));
      return response.data as Admin[];
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  public async search(q: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.get(
        "/admin/search/" + q,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error fetching admins: ${error}`);
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

  public async create<T>(
    data: T
  ): Promise<AxiosResponse | AxiosError | ServerError | ServerCreateResponse> {
    try {
      const response = await this.api.post(this.path + "/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
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
    data: T
  ): Promise<AxiosResponse | AxiosError | ServerError | ServerUpdateResponse> {
    try {
      const response = await this.api.put(`${this.path}`, data, {
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

export default new AdminAPI();
