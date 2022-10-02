import FormLogin from "./components/formLogin";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { LoginRequest } from "./components/formLogin/formLogin.types";
import { useState } from "react";
import { LoginApi } from "../../api/login.api";

export default function LoginPage() {
  const loginApi = new LoginApi();

  const [loginObj, setLoginObj] = useState<LoginRequest>({
    login: "",
    password: "",
  });

  const sendRequest = () => {
    loginApi.login(loginObj).then((response) => {
      console.log(response);
    })
  };

  return (
    <div className="mt-32 w-full h-4/5">
      <FormLogin
        loginObj={loginObj}
        setLoginObj={setLoginObj}
        login={() => sendRequest()}
      />
    </div>
  );
}
