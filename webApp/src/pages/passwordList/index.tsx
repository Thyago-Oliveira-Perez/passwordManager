import { useEffect, useState } from "react";
import { PasswordApi } from "../../api/passwords.api";
import { PasswordsResponse } from "./password.types";
import DefaultTable from "../../components/defaultTable";
import { Button } from "@mui/material";

export default function PasswordList() {
  const passwordApi = new PasswordApi();
  const [userPasswords, setUserPasswords] = useState<PasswordsResponse[]>([]);
  const [deletedPassword, setDeletedPassword] = useState<string>("");

  useEffect(() => {
    passwordApi.getUserPasswords().then((response: any) => {
      setUserPasswords(response.data.content);
    });
  }, []);

  const updatePassword = () => {
    passwordApi.updateUserPasswords(userPasswords).then((response: any) => {
      setUserPasswords(response.data.content);
    });
  }

  useEffect(() => {
    if(deletedPassword !== ""){
      passwordApi.deleteUserPasswords(deletedPassword).then(() => {
        setDeletedPassword("");
      });
    }
  }, [deletedPassword])

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <DefaultTable 
        list={userPasswords}
        setList={setUserPasswords}
        setDelete={setDeletedPassword}
       />
      <Button
        onClick={() => updatePassword()}
      >
        Salvar 
      </Button>
    </div>
  );
}
