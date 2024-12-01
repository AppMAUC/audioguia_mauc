import apiService from "../../../services/api/apiService";
import { api } from "../../../services/api/";

export class ArtWorkService extends apiService {
  constructor() {
    super(api, "/artworks");
  }
}

export default new ArtWorkService();
