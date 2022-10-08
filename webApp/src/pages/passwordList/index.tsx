import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserApi } from "../../api/user.api";
import { PasswordApi } from "../../api/passwords.api";

export default function PasswordList() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const passwordApi = new PasswordApi();
  const [userPasswords, setUserPasswords] = useState([]);

  useEffect(() => {
    passwordApi.getUsersPasswords().then((response: any) => {
      setUserPasswords(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <div>
      <List dense={dense}>
        {userPasswords.map((password) => {
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
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
            </>
          )
        })}
      </List>
    </div>
  );
}
