import apiService from "../../../services/api/apiService";
import { api } from "../../../services/api/";

export class ExpositionService extends apiService {
  constructor() {
    super(api, "/expositions");
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
}

export default new ExpositionService();
