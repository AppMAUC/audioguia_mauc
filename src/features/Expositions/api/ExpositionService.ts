import apiService from "../../../services/api/apiService";
import { api } from "../../../services/api/";

export class ExpositionService extends apiService {
  constructor() {
    super(api, "/expositions");
  }
}

export default new ExpositionService();
