import { Button, InputLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormDefaultTypes } from "./formeRegister.types";

export default function FormDefault(props: FormDefaultTypes) {
  return (
    <div className="flex flex-col justify-between items-center h-96">
      <h1 className="text-4xl text-white">{props.tittle}</h1>

      <div>
        <TextField
          label="Name"
          variant="outlined"
          required={true}
          onChange={(e) =>
            props.setObject({
              ...props.object,
              name: e.target.value,
            })
          }
          className="w-60"
        />
      </div>

      <div>
        <TextField
          label="Email"
          variant="outlined"
          type="password"
          required={true}
          onChange={(e) =>
            props.setObject({
              ...props.object,
              email: e.target.value,
            })
          }
          className="w-60"
        />
      </div>

      <div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required={true}
          onChange={(e) =>
            props.setObject({
              ...props.object,
              password: e.target.value,
            })
          }
          className="w-60"
        />
      </div>

      <div>
        <Button
          onClick={() => props.function()}
          className="w-60"
          variant="contained"
          disabled={
            props.object.name != "" &&
            props.object.email != "" &&
            props.object.password != ""
              ? false
              : true
          }
        >
          Register
        </Button>
      </div>
    </div>
  );
}
