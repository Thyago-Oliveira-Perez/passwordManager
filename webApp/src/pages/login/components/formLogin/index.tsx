import { TextField, Button, InputLabel } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FormLoginTypes } from "./formLogin.types";

export default function FormLogin(props: FormLoginTypes) {
  return (
    <div className="flex flex-col justify-between items-center h-96">
      <h1 className="text-4xl text-white">Welcome back!</h1>

      <div>
        <TextField
          label="Login"
          variant="outlined"
          required={true}
          onChange={(e) =>
            props.setLoginObj({
              ...props.loginObj,
              login: e.target.value,
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
            props.setLoginObj({
              ...props.loginObj,
              password: e.target.value,
            })
          }
          className="w-60"
        />
      </div>

      <div>
        <Button
          onClick={() => props.login()}
          className="w-60"
          variant="contained"
          disabled={
            props.loginObj.login != "" && props.loginObj.password != ""
              ? false
              : true
          }
        >
          Login
        </Button>
      </div>

      <div className="flex flex-col content-center m-2">
        <InputLabel className="text-center">Não tem uma conta?</InputLabel>
        <Link className="text-center" to="/register">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
