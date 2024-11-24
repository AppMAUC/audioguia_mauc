import { requestConfig } from "./config";
import { AxiosInstance, AxiosResponse } from "axios";

class apiService {
  protected api: AxiosInstance;
  protected path: string;

  constructor(api: AxiosInstance, path: string) {
    this.api = api;
    this.path = path;
  }

  public async getAll(): Promise<AxiosResponse> {
    try {
      const response = await this.api.get(this.path, requestConfig(false));
      return response;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  public async getById(id: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.get(
        `${this.path}/${id}`,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error fetching data by ID: ${error}`);
    }
  }

  public async create(data: object): Promise<AxiosResponse> {
    try {
      const response = await this.api.post(
        this.path,
        data,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error creating data: ${error}`);
    }
  }

  public async update(id: string, data: object): Promise<AxiosResponse> {
    try {
      const response = await this.api.put(
        `${this.path}/${id}`,
        data,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error updating data: ${error}`);
    }
  }

  public async delete(id: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.delete(
        `${this.path}/${id}`,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error deleting data: ${error}`);
    }
  }
}

export default apiService;
