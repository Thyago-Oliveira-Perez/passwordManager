import { LoginResponse } from "../pages/login/components/formLogin/formLogin.types";

const AuthService = {

  setLoggedUser(userLogged: LoginResponse){
    let parsedData = JSON.stringify(userLogged)
    localStorage.setItem("user", parsedData)
  }

}

export default AuthService;