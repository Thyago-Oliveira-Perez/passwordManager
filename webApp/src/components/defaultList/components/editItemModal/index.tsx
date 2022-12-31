import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { EditItemModalProps } from "./types";

export default function EditItemModal(props: EditItemModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      keepMounted
      open={props.open}
      onClose={() => props.onClose()}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center justify-around w-full">
          <input
            className="rounded-md border-solid border-2 border-slate-900 text-center w-3/5"
            type="text"
            value={props.passwordToEdit}
            onChange={(e) => props.setPasswordToEdit(e.target.value)}
          />
          <button className="w-1/5 rounded-md bg-green-500">SAVE</button>
        </div>
      </Box>
    </Modal>
  );
}
