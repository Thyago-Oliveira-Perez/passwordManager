import { CommonApi } from "./common.api";
import {
  LoginRequest,
  LoginResponse,
} from "../pages/login/components/formLogin/formLogin.types";

import {
  RegisterRequest,
  RegisterResponse,
} from "../components/formeRegister/formeRegister.types";
import { UserResponse } from "../pages/loggedUser/loggedUser.types";

export class UserApi extends CommonApi {
  constructor() {
    super();
  }

  public async login(loginRequest: LoginRequest) {
    return await this._login<LoginRequest, LoginResponse>(
      loginRequest,
      "/auth/login"
    );
  }

  public async register(registerRequest: RegisterRequest) {
    return await this._post<RegisterRequest, RegisterResponse>(
      registerRequest,
      "/api/users/register"
    );
  }

  public async getMyData() {
    return await this._getDatas<UserResponse>("/api/users/my-datas");
  }
}
