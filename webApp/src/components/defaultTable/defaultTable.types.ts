import React from "react";
import { PasswordsResponse } from "../../pages/passwordList/password.types";

export interface defaultTableProps{
  list: PasswordsResponse[]
  setList: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  setDelete: React.Dispatch<React.SetStateAction<string>>;
}