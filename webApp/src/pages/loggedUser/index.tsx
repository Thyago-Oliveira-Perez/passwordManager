import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/user.api";
import FormDefault from "../../components/formeRegister";
import { UpdateUserDatasRequest } from "../../components/formeRegister/formeRegister.types";
import AuthService from "../../services/auth.service";

export default function LoggedUser() {
  const userApi = new UserApi();
  const authService = new AuthService();
  const navigate = useNavigate();

  const [userDatas, setUserDatas] = useState<UpdateUserDatasRequest>({
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

  const updateUser = () => {
    console.log(userDatas)
    userApi.update(userDatas).then((response: any) => {
      navigate("/home");
    })
  };

  return (
    <div className="mt-32 w-full h-4/5">
      <FormDefault
        object={userDatas}
        setObject={setUserDatas}
        function={() => updateUser()}
        title={"Dados Pessoais"}
      />
    </div>
  );
}
