import { useState } from "react";
import { UserApi } from "../../api/user.api";
import FormRegister from "./components/formeRegister";
import { RegisterRequest } from "./components/formeRegister/formeRegister.types";

export default function RegisterPage() {
  const userApi = new UserApi();

  const [registerObj, setRegisterObj] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });

  const register = () => {
    userApi.register(registerObj).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="mt-32 w-full h-4/5">
      <FormRegister
        registerObj={registerObj}
        setRegisterObj={setRegisterObj}
        register={() => register()}
      />
    </div>
  );
}
