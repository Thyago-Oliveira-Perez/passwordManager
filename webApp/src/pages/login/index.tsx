import FormLogin from "./components/formLogin";
import { LoginRequest } from "./components/formLogin/formLogin.types";
import { useState } from "react";
import { UserApi } from "../../api/user.api";

export default function LoginPage() {
  const userApi = new UserApi();

  const [loginObj, setLoginObj] = useState<LoginRequest>({
    login: "",
    password: "",
  });

  const sendRequest = () => {
    userApi.login(loginObj).then((response) => {
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