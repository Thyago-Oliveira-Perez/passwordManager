import { useEffect, useState } from "react";
import { PasswordApi } from "../../api/passwords.api";
import { PasswordsResponse } from "./password.types";
import DefaultTable from "./defaultTable";
import { Button } from "@mui/material";
import { PasswordRounded } from "@mui/icons-material";

export default function PasswordList() {
  const passwordApi = new PasswordApi();
  const [passwords, setPasswords] = useState<PasswordsResponse[]>([]);
  const [userPasswords, setUserPasswords] = useState<PasswordsResponse[]>([]);

  const [deletedPasswords, setDeletedPasswords] = useState<string[]>([]);
  const [updatedPasswords, setUpdatedPasswords] = useState<PasswordsResponse[]>([]);
  const [newPasswords, setNewPasswords] = useState<PasswordsResponse[]>([]);

  useEffect(() => {
    passwordApi.getUserPasswords().then((response: any) => {
      setUserPasswords(response.data.content);
      setPasswords(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (deletedPasswords.length > 0) {
      setUserPasswords(
        userPasswords.filter((e) => deletedPasswords.includes(e.id))
      );
    }
  }, [deletedPasswords]);

  const saveChanges = () => {
    if (deletedPasswords.length > 0) {
      passwordApi.deleteUserPasswords(deletedPasswords);
    }
    if (updatedPasswords.length > 0){
      passwordApi.updateUserPasswords(updatedPasswords);
    }
    if(newPasswords.length > 0){
      passwordApi.insertUserPasswords(newPasswords);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <DefaultTable
        mainList={userPasswords}
        setMainList={setUserPasswords}

        newPasswords={newPasswords}
        setNewPasswords={setNewPasswords}

        updatedPasswords={updatedPasswords}
        setUpdatedPasswords={setUpdatedPasswords}

        deletedList={deletedPasswords}
        setDelete={setDeletedPasswords}
      />
      <Button
        disabled={userPasswords.find((e) => e.value === "") ? true : false}
        onClick={() => saveChanges()}
      >
        Salvar
      </Button>
    </div>
  );
}
