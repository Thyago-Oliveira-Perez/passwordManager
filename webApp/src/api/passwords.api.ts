import { CommonApi } from "./common.api";
import { PasswordsResponse } from "../pages/passwordList/password.types";

export class PasswordApi extends CommonApi {
  constructor() {
    super();
  }

  public async getMyPasswords() {
    return await this._getDatas<PasswordsResponse>("/api/passwords/my-passwords");
  }
}
