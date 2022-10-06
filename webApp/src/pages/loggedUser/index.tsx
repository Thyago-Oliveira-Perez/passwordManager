import { useEffect, useState } from "react";
import { UserApi } from "../../api/user.api";
import FormDefault from "../../components/formeRegister";
import { RegisterRequest } from "../../components/formeRegister/formeRegister.types";
import AuthService from "../../services/auth.service";
import { UserResponse } from "./loggedUser.types";

export default function LoggedUser() {
  const userApi = new UserApi();
  const authService = new AuthService();

  const [userDatas, setUserDatas] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    let token = authService.getLoggedUser().Token;
    if (token != null) {
      userApi.getMyData().then((response: any) => {
        setUserDatas({
          name: response.data.name,
          email: response.data.email,
          password: ""
        });
      });
    }
  }, []);

  const updateUser = () => {};

  return (
    <div className="mt-32 w-full h-4/5">
      <FormDefault
        object={userDatas}
        setObject={setUserDatas}
        function={() => updateUser()}
        tittle={"Dados Pessoais"}
      />
    </div>
  );
}
