import { Checkbox } from "@mui/material";
import { useState } from "react";
import { PasswordsResponse } from "../../pages/passwordList/password.types";
import { defaultTableProps } from "./defaultTable.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import addIcon from "../../assets/add-icon.svg";

export default function DefaultTable(props: defaultTableProps) {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<PasswordsResponse[]>([]);

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

  return (
    <div className="w-3/5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="items-center w-3/5">
              <Checkbox
                checked={allSelected}
                onClick={() => onSelectAllItems()}
              />
            </th>
            <th className="items-center w-3/5">Password</th>
            <th className="items-center w-3/5"></th>
            <th className="items-center w-4/5">Actions</th>
            <th className="items-center w-3/5"></th>
            <th className="h-6 w-6">
              <img src={addIcon} alt="" />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item) => {
            return (
              <tr id={item.id + item.value}>
                <td className="items-center w-3/5">
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onClick={() => handleSelectedItems(item)}
                  />
                </td>
                <td className="items-center w-3/5">{item.value}</td>
                <td className="items-center w-3/5"></td>
                <td className="items-center w-3/5">
                  <EditIcon />
                </td>
                <td className="items-center w-3/5">
                  <DeleteIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
