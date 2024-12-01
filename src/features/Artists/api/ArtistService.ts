import apiService, { ApiError } from "../../../services/api/apiService";
import { api } from "../../../services/api/";
import { requestConfig } from "../../../services/api/config";
import { AxiosError } from "axios";

export class ArtistService extends apiService {
  constructor() {
    super(api, "/artists");
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
