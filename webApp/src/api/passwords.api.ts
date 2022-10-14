import { CommonApi } from "./common.api";
import { PasswordsResponse } from "../pages/passwordList/password.types";

export class PasswordApi extends CommonApi {
  constructor() {
    super();
  }

  public async getUserPasswords() {
    return await this._getDatas<PasswordsResponse>("/api/passwords/user-passwords");
  }

  public async insertUserPasswords(newPasswords: PasswordsResponse[]){
    return await this._insert<PasswordsResponse[]>(newPasswords, "/api/passwords/insert")
  }

  public async updateUserPasswords(updatedPassword: PasswordsResponse[]) {
    return await this._update<PasswordsResponse[]>(updatedPassword, "/api/passwords/update");
  } 

  public async deleteUserPasswords(deletedIds: string[]){
    return await this._delete<string[]>(deletedIds, "api/passwords/delete");
  }
}
