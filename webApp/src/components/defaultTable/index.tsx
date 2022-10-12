import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import { PasswordsResponse } from "../../pages/passwordList/password.types";
import { defaultTableProps } from "./defaultTable.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import addIcon from "../../assets/add-icon.svg";

export default function DefaultTable(props: defaultTableProps) {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<PasswordsResponse[]>([]);
  const [editedItems, setEditedItems] = useState<PasswordsResponse[]>([]);

  const onSelectAllItems = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(props.list);
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
    if (!save) {
      if (!editedItems.includes(item)) {
        setEditedItems([...editedItems, item]);
      } else {
        var aux = editedItems.filter((e) => e.id != item.id);
        setEditedItems(aux);
      }
    }

    if (save) {
      const newItems = props.list.map((e) => {
        if (e.id === item.id) {
          newValue != undefined ? (e.value = newValue) : (e.value = item.value);
          return e;
        }
        return e;
      });
      props.setList(newItems);
    }
  };

  const handleDeletedItems = (id: string) => {
    props.setDelete(id);
  };

  return (
    <div className="w-3/5">
      <table className="w-full">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={allSelected}
                onClick={() => onSelectAllItems()}
              />
            </th>
            <th>Password</th>
            <th></th>
            <th>Actions</th>
            <th></th>
            <th className="h-6 w-6">
              <img
                onClick={() => console.log("adicionar nova senha")}
                src={addIcon}
                alt=""
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => {
            return (
              <tr id={item.id + item.value}>
                <td>
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onClick={() => handleSelectedItems(item)}
                  />
                </td>
                <td>
                  <TextField
                    disabled={!editedItems.includes(item)}
                    defaultValue={item.value}
                    onChange={(e) =>
                      handleEditedItems(item, true, e.target.value)
                    }
                  />
                </td>
                <td></td>
                <td>
                  <EditIcon onClick={() => handleEditedItems(item, false)} />
                </td>
                <td>
                  <DeleteIcon onClick={() => handleDeletedItems(item.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
