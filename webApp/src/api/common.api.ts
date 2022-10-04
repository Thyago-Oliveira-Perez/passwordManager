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

  protected async _getDatas<T>(token: string, url: string): Promise<T>
  {
    try{
      return await this.axiosClient.post(`${this.url}` + url, token);
    }catch(error: any){
      return this.handleError(error);
    } 
  }

  protected async _post<T, U>(model: T, url: string): Promise<U> {
    try {
      return await this.axiosClient.post(`${this.url}` + url, model);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
