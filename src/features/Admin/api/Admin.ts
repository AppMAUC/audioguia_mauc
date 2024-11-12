import { AxiosInstance, AxiosResponse } from "axios";
import { api } from "../../../services/api";
import { requestConfig } from "../../../services/api/config";

class AdminAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = api;
  }

  public async getAdmins(): Promise<AxiosResponse> {
    try {
      const response = await this.api.get("/admin", requestConfig(false));
      return response;
    } catch (error) {
      throw new Error(`Error fetching admins: ${error}`);
    }
  }
  public async searchAdmins(q: string): Promise<AxiosResponse> {
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

  public async getAdminById(id: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.get(`/admin/${id}`, requestConfig(false));
      return response;
    } catch (error) {
      throw new Error(`Error fetching admin by ID: ${error}`);
    }
  }

  public async createAdmin(adminData: object): Promise<AxiosResponse> {
    try {
      const response = await this.api.post(
        "/admin/register",
        adminData,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error creating admin: ${error}`);
    }
  }

  public async updateAdmin(
    id: string,
    adminData: object
  ): Promise<AxiosResponse> {
    try {
      const response = await this.api.put(
        `/admin/${id}`,
        adminData,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error updating admin: ${error}`);
    }
  }

  public async deleteAdmin(id: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.delete(
        `/admin/${id}`,
        requestConfig(false)
      );
      return response;
    } catch (error) {
      throw new Error(`Error deleting admin: ${error}`);
    }
  }
}

export default AdminAPI;
