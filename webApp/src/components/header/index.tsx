import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect, useState } from "react";
import HeaderItem from "./components/headerItem";

export default function Header() {
  const authService = new AuthService();
  const [userPerfil, setUserPerfil] = useState("");

  useEffect(() => {
    let loggedUserAux = authService.getLoggedUser();
    setUserPerfil(loggedUserAux != null ? loggedUserAux.UserName : "");
  });

  const handleLogout = () => {
    authService.logoutUser();
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between h-20 w-auto bg-slate-800">
      <div className="w-1/2">
        <div className="flex justify-start px-12">
          <HeaderItem text={"Home"} path={"/"}>
            <HomeRoundedIcon />
          </HeaderItem>
          {userPerfil !== "" ? (
            <HeaderItem text={"My Password"} path={"/my-passwords"}>
              <KeyIcon />
            </HeaderItem>
          ) : null}
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-end px-12">
          {userPerfil !== "" ? (
            <>
              <HeaderItem text={userPerfil} path={`/${userPerfil}`}>
                <PersonSharpIcon />
              </HeaderItem>

              <HeaderItem text={"Logout"} path={"/"} onClick={() => handleLogout()}>
                <LogoutIcon />
              </HeaderItem>
            </>
          ) : (
            <HeaderItem text={"Login"} path={"/login"}>
              <PersonSharpIcon style={{ color: "white" }} />
            </HeaderItem>
          )}
        </div>
      </div>
    </header>
  );
}
