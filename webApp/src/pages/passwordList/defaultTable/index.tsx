import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import { PasswordsResponse } from "../types";
import { defaultTableProps } from "./types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DefaultTable(props: defaultTableProps) {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<PasswordsResponse[]>([]);

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

  const handleEditedItems = (
    item: PasswordsResponse,
    save: boolean,
    newValue?: string
  ) => {
    if (save) {
      const updatedItems = props.mainList.map((e) => {
        if (e.id === item.id) {
          newValue != undefined ? (e.value = newValue) : (e.value = item.value);
          return e;
        }
        return e;
      });
      props.setUpdatedPasswords(updatedItems);
    } else {
      if (!props.updatedPasswords.includes(item)) {
        props.setUpdatedPasswords([...props.updatedPasswords, item]);
      } else {
        var aux = props.updatedPasswords.filter((e) => e.id != item.id);
        props.setUpdatedPasswords(aux);
      }
    }
  };

  const handleDeletedItems = (id: string) => {
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

  return (
    <div className="w-3/5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/3">
              <Checkbox
                checked={allSelected}
                onClick={() => onSelectAllItems()}
              />
            </th>

            <th className="w-1/3">Password</th>

            <th className="w-1/3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.mainList.map((item, index) => {
            return (
              <tr key={item.id}>

                <th className="w-1/3">
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onClick={() => handleSelectedItems(item)}
                  />
                </th>

                <th className="w-1/3">
                  <input
                    type="text"
                    disabled={!props.updatedPasswords.includes(item)}
                    defaultValue={item.value}
                    onChange={(e) =>
                      handleEditedItems(item, true, e.target.value)
                    }
                    className="text-center"
                  />
                </th>

                <th className="w-1/3">
                  <div className="flex flex-row items-center justify-center gap-10">
                    <EditIcon onClick={() => handleEditedItems(item, false)} />
                    <DeleteIcon onClick={() => handleDeletedItems(item.id)} />
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
