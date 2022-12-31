import React from "react";
import { DeletedPasswords, PasswordsResponse } from "../../pages/passwordList/types";

export interface defaultTableProps {
  mainList: PasswordsResponse[];
  setMainList: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  newPasswords: PasswordsResponse[];
  setNewPasswords: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  updatedPasswords: PasswordsResponse[];
  setUpdatedPasswords: React.Dispatch<React.SetStateAction<PasswordsResponse[]>>;
  deletedList: DeletedPasswords;
  setDelete: React.Dispatch<React.SetStateAction<DeletedPasswords>>;
}
