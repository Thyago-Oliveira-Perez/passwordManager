import { useEffect, useState } from "react";
import { PasswordApi } from "../../api/passwords.api";
import { DeletedPasswords, PasswordsResponse } from "./types";
import { Button } from "@mui/material";
import { PasswordRounded } from "@mui/icons-material";
import DefaultTable from "../../components/defaultList";

export default function PasswordList() {
  const passwordApi = new PasswordApi();
  const [userPasswords, setUserPasswords] = useState<PasswordsResponse[]>([]);

  const [deletedPasswords, setDeletedPasswords] = useState<DeletedPasswords>({deletedPasswords: []});
  const [updatedPasswords, setUpdatedPasswords] = useState<PasswordsResponse[]>(
    []
  );
  const [newPasswords, setNewPasswords] = useState<PasswordsResponse[]>([]);

  useEffect(() => {
    passwordApi.getUserPasswords().then((response: any) => {
      setUserPasswords(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (deletedPasswords.deletedPasswords.length > 0) {
      setUserPasswords(
        userPasswords.filter((e) => !deletedPasswords.deletedPasswords.includes(e.id))
      );
    }
  }, [deletedPasswords]);

  useEffect(() => {
    if (newPasswords.length > 0) {
      setUserPasswords([...userPasswords, ...newPasswords]);
    }
  }, [newPasswords]);

  const saveChanges = () => {
    if (deletedPasswords.deletedPasswords.length > 0) {
      passwordApi.deleteUserPasswords(deletedPasswords).then(() => {
        window.location.reload();
      });
    }
    if (updatedPasswords.length > 0) {
      passwordApi.updateUserPasswords(updatedPasswords).then(() => {
        window.location.reload();
      });
    }
    if (newPasswords.length > 0) {
      passwordApi.insertUserPasswords(newPasswords).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-auto mt-16">
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
      <Button disabled={userPasswords.find((e) => e.value === "") ? true :false} onClick={() => saveChanges()}>
        Save Changes
      </Button>
    </div>
  );
}
