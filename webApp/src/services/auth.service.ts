export default class AuthService{

  setLoggedUser(userLogged: any){
    if(userLogged != null){
      let parsedData = JSON.stringify(userLogged)
      localStorage.setItem("user", parsedData)
    }
  }

  getLoggedUser(){
    let user = localStorage.getItem("user");
    if(user != null){
      console.log("function = ", JSON.parse(user))
      return JSON.parse(user)
    }
    return user;
  }

}