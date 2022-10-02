import { Button, InputLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FormRegisterTypes } from "./formeRegister.types";

export default function FormRegister(props: FormRegisterTypes) {
  return (
    <div className="flex flex-col justify-between items-center h-96">
      <h1 className="text-4xl text-white">Register Account</h1>

      <div>
        <TextField
          label="Name"
          variant="outlined"
          required={true}
          onChange={(e) =>
            props.setRegisterObj({
              ...props.registerObj,
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
            props.setRegisterObj({
              ...props.registerObj,
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
            props.setRegisterObj({
              ...props.registerObj,
              password: e.target.value,
            })
          }
          className="w-60"
        />
      </div>

      <div>
        <Button
          onClick={() => props.register()}
          className="w-60"
          variant="contained"
          disabled={
            props.registerObj.name != "" &&
            props.registerObj.email != "" &&
            props.registerObj.password != ""
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
