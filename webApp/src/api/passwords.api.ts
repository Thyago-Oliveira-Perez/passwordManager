import { CommonApi } from "./common.api";
import { DeletedPasswords, PasswordsResponse } from "../pages/passwordList/password.types";

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

  public async deleteUserPasswords(deletedPasswords: DeletedPasswords){
    return await this._delete<DeletedPasswords>(deletedPasswords, "/api/passwords/delete");
  }
}
