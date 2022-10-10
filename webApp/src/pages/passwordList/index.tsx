import { useEffect, useState } from "react";
import { PasswordApi } from "../../api/passwords.api";
import { PasswordsResponse } from "./password.types";
import DefaultTable from "../../components/defaultTable";

export default function PasswordList() {
  const passwordApi = new PasswordApi();
  const [userPasswords, setUserPasswords] = useState<PasswordsResponse[]>([]);

  useEffect(() => {
    passwordApi.getUsersPasswords().then((response: any) => {
      setUserPasswords(response.data.content);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen">
        <DefaultTable list={userPasswords} />
    </div>
  );
}
