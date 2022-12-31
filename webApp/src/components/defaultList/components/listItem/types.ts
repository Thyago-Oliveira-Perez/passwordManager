import { PasswordsResponse } from "../../../../pages/passwordList/types";

export interface ListItemProps {
  item: PasswordsResponse;
  selectedItems: PasswordsResponse[];
  handleEditItem: (passwordToEdit: string) => void;
  handleSelectedItems: (item: PasswordsResponse) => void;
  handleDeletedItem: (id: string) => void;
}
