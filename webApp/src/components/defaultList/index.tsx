import { useEffect, useState } from "react";
import { defaultTableProps } from "./types";
import { PasswordsResponse } from "../../pages/passwordList/types";
import ListItem from "./components/listItem";
import EditItemModal from "./components/editItemModal";

export default function DefaultTable(props: defaultTableProps) {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<PasswordsResponse[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [passwordToEdit, setPasswordToEdit] = useState<string>("");

  const onSelectAllItems = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(props.mainList);
    }
    setAllSelected(!allSelected);
  };

  const handleSelectedItems = (item: PasswordsResponse) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      var auxList = selectedItems.filter((e) => e.id != item.id);
      if (auxList.length === 0) {
        setAllSelected(false);
      }
      setSelectedItems(auxList);
    }
  };

  const handleEditItem = (passwordToEdit: string) => {
    setOpen(true);
    setPasswordToEdit(passwordToEdit);
  };

  const handleDeletedItem = (id: string) => {
    props.setDelete({
      deletedPasswords: props.deletedList.deletedPasswords.concat(id),
    });
  };

  const handleAddItem = () => {
    props.setNewPasswords([
      ...props.newPasswords,
      {
        id: "",
        value: "",
      },
    ]);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPasswordToEdit("");
  }

  useEffect(() => {
    console.log(passwordToEdit)
  },[passwordToEdit])

  return (
    <div className="w-3/5">
      <ul>
        {props.mainList.map((item, index) => {
          return (
            <li
              key={item.id}
              className="flex items-center justify-around rounded-md border-solid border-2 border-zinc-200 mb-10"
            >
              <ListItem
                key={item.id}
                item={item}
                selectedItems={selectedItems}
                handleEditItem={handleEditItem}
                handleSelectedItems={handleSelectedItems}
                handleDeletedItem={handleDeletedItem}
              />
            </li>
          );
        })}
      </ul>
      <EditItemModal
        open={open}
        onClose={handleCloseModal}
        passwordToEdit={passwordToEdit}
        setPasswordToEdit={setPasswordToEdit}
      />
    </div>
  );
}
