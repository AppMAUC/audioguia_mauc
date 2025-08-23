import apiService, { ApiError } from "../../../services/api/apiService";
import { api } from "../../../services/api/";
import { requestConfig } from "../../../services/api/config";
import { AxiosError } from "axios";

export class ArtistService extends apiService {
  constructor() {
    super(api, "/artists");
  }

  getAll<T>(page = 1, limit = 10): Promise<{
    data: T[];
    pages: number;
    items: number;
    next: number | null;
    prev: number | null;
    first: number;
    last: number;
  }> {
    return this.api
      .get(`${this.path}?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  }

  public async getById<T>(id: string): Promise<T> {
    try {
      const response = await this.api
        .get(`${this.path}/${id}`, requestConfig(false))
        .then((res) => {
          const data = res.data;
          data.birthDate = data.birthDate.split("T")[0];

          return data;
        });
      return response as T;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.isAxiosError) {
        throw axiosError.response?.data as ApiError;
      }
      throw error;
    }
  }
}

export default new ArtistService();
