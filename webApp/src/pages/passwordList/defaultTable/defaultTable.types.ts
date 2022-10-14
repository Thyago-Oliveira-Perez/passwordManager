import React from "react";
import { PasswordsResponse } from "../password.types";

export interface defaultTableProps {
  mainList: PasswordsResponse[];
  setMainList: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  newPasswords: PasswordsResponse[];
  setNewPasswords: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  updatedPasswords: PasswordsResponse[];
  setUpdatedPasswords: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  deletedList: string[];
  setDelete: React.Dispatch<React.SetStateAction<string[]>>;
}
