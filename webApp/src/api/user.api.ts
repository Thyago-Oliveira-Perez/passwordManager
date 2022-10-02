import { CommonApi } from "./common.api";
import {
  LoginRequest,
  LoginResponse,
} from "../pages/login/components/formLogin/formLogin.types";

import {
  RegisterRequest,
  RegisterResponse,
} from "../pages/register/components/formeRegister/formeRegister.types";

export class UserApi extends CommonApi {
  constructor() {
    super();
    this.url = this.url + "/auth/login";
  }

  public async login<LoginRequest, LoginResponse>(
    loginRequest: LoginRequest
  ): Promise<LoginResponse> {
    return await this._post(loginRequest);
  }

  public async register<RegisterRequest, RegisterResponse>(
    registerRequest: RegisterRequest
  ): Promise<RegisterResponse> {
    return await this._post(registerRequest);
  }
}
