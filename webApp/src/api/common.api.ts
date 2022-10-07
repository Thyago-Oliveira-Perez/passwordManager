import axios, { AxiosInstance } from "axios";
import AuthService from "../services/auth.service";

export class CommonApi {
  /**
   * Cria uma instância do axios para fazer
   * as requisições
   */
  url: string = "http://localhost:8080";
  axiosClient: AxiosInstance = axios.create({
    baseURL: this.url,
    headers: {
      "Content-type": "application/json",
    },
  });

  /**
   * Instancia a classe responsável por manusear
   * os dados do LocalStorage
   */
  authService = new AuthService();

  /**
   * Define o tipo de autenticação e pega o token
   * do LocalStorage do navegador para mandar junto na requisição
   */
  authorization = `Bearer ${
    this.authService.getLoggedUser() !== null
      ? this.authService.getLoggedUser().Token
      : ""
  }`;

  /**
   * Método auxiliar para lidar com exceções
   */
  private handleError(error: any) {
    return Promise.reject(error.response);
  }

  /**
   * Métodos comuns entre as api's de consumos
   */
  protected async _getDatas<T>(url: string): Promise<T> {
    try {
      return await this.axiosClient.get(`${this.url}` + url, {
        headers: {
          Authorization: this.authorization,
        },
      });
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _post<T, U>(model: T, url: string): Promise<U> {
    try {
      return await this.axiosClient.post(`${this.url}` + url, model, {
        headers: {
          Authorization: this.authorization,
        },
      });
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _login<T, U>(model: T, url: string): Promise<U> {
    try {
      return await this.axiosClient.post(`${this.url}` + url, model);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
