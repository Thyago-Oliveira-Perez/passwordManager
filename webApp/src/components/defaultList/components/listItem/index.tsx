import { Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemProps } from "./types";

export default function ListItem(props: ListItemProps) {
  return (
    <>
      <div>
        <Checkbox
          checked={props.selectedItems.includes(props.item)}
          onClick={() => props.handleSelectedItems(props.item)}
        />
      </div>
      <div>
        <label className="text-2xl text-center">{props.item.value}</label>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => props.handleEditItem(props.item.value)}
        />
        <DeleteIcon onClick={() => props.handleDeletedItem(props.item.id)} />
      </div>
    </>
  );
}
