import FormLogin from "./components/formLogin";
import {
  LoginRequest,
  LoginResponse,
} from "./components/formLogin/types";
import { useState } from "react";
import { UserApi } from "../../api/user.api";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const userApi = new UserApi();
  const authService = new AuthService();
  const navigate = useNavigate();

  const [loginObj, setLoginObj] = useState<LoginRequest>({
    login: "",
    password: "",
  });

  const sendRequest = () => {
    userApi.login(loginObj).then((response: any) => {
      authService.setLoggedUser(response.data);
      navigate("/");
      window.location.reload();
    });
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
