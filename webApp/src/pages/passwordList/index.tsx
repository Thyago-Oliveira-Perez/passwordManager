import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserApi } from "../../api/user.api";
import { PasswordApi } from "../../api/passwords.api";
import { PasswordsResponse } from "./password.types";

export default function PasswordList() {
  const [dense, setDense] = useState(false);

  const passwordApi = new PasswordApi();
  const [userPasswords, setUserPasswords] = useState<PasswordsResponse[]>([]);

  useEffect(() => {
    passwordApi.getUsersPasswords().then((response: any) => {
      setUserPasswords(response.data.content)
    })
  }, [])

  return (
    <div>
      <List dense={dense}>
        {userPasswords.map((password:PasswordsResponse) => {
          return(
            <>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="Single-line item"
              aria-label={password.value}
            />
          </ListItem>
            </>
          )
        })}
      </List>
    </div>
  );
}
