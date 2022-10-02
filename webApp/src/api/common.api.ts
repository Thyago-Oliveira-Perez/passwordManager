import axios, { AxiosInstance } from "axios";

export class CommonApi {
  url = "http://localhost:8080";

  axiosClient: AxiosInstance = axios.create({
    baseURL: this.url,
    headers: { "Content-type": "application/json" },
  });

  private handleError(error: any){
    return Promise.reject(error.response)
  }

  protected async _login<T>(model: T): Promise<T> {
    try {
      return await this.axiosClient.post(`${this.url}`, model);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
