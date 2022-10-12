export default class AuthService {
  setLoggedUser(userLogged: any) {
    if (userLogged != null) {
      let parsedData = JSON.stringify(userLogged);
      localStorage.setItem("user", parsedData);
    }
  }

  getLoggedUser() {
    let user = localStorage.getItem("user");
    if (user != null) {
      return JSON.parse(user);
    }
    return user;
  }

  logoutUser() {
    localStorage.removeItem("user");
  }
}
