import { CommonApi } from "./common.api";
import { PasswordsResponse } from "../pages/passwordList/password.types";

export class PasswordApi extends CommonApi {
  constructor() {
    super();
  }

  public async getUserPasswords() {
    return await this._getDatas<PasswordsResponse>("/api/passwords/user-passwords");
  }

  public async updateUserPasswords(updatedPassword: PasswordsResponse[]) {
    return await this._post<PasswordsResponse[], PasswordsResponse[]>(updatedPassword, "/api/passwords/update");
  }

  public async deleteUserPasswords(id: string){
    return await this._delete(id, "/api/passwords/delete");
  }  
}
