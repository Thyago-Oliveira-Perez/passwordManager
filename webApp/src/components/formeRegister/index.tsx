import { Button, TextField } from "@mui/material";
import { FormDefaultTypes } from "./formeRegister.types";

export default function FormDefault(props: FormDefaultTypes) {
  return (
    <div className="flex flex-col justify-between items-center h-96">
      <h1 className="text-4xl text-white">{props.title}</h1>

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
          value={props.object.name}
          className="w-60"
        />
      </div>

      <div>
        <TextField
          label="Email"
          variant="outlined"
          required={true}
          onChange={(e) =>
            props.setObject({
              ...props.object,
              email: e.target.value,
            })
          }
          value={props.object.email}
          className="w-60"
        />
      </div>

      <div>
        <TextField
          label="Password"
          variant="outlined"
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
          Save
        </Button>
      </div>
    </div>
  );
}
