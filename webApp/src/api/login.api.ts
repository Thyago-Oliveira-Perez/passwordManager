import {
  LoginRequest,
  LoginResponse,
} from "../pages/login/components/formLogin/formLogin.types";
import { CommonApi } from "./common.api";

export class LoginApi extends CommonApi {
  constructor() {
    super();
    this.url = this.url + "/auth/login";
  }

  public async login<LoginResponse>(LoginRequest: LoginRequest): Promise<LoginResponse> {
    return (await this.axiosClient.post(`${this.url}`, LoginRequest)).data;
  }
}
