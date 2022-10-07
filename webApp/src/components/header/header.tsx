import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyIcon from "@mui/icons-material/Key";

import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect, useState } from "react";

export default function Header() {
  const authService = new AuthService();
  const [userPerfil, setUserPerfil] = useState("");

  useEffect(() => {
    let loggedUserAux = authService.getLoggedUser();
    setUserPerfil(loggedUserAux != null ? loggedUserAux.UserName : "");
  });

  return (
    <header className="flex items-center justify-between h-20 w-auto bg-slate-800">
      <div className="w-1/2 px-12">
        <Link to="/home">
          <HomeRoundedIcon />
          Home
        </Link>
      </div>
      <div className="w-1/2">
        <ul className="flex justify-end px-12">
          {userPerfil !== "" ? (
            <>
              <li className="m-3">
                <Link to={"/" + userPerfil}>
                  <PersonSharpIcon />
                  {userPerfil}
                </Link>
              </li>
              <li className="m-3">
                <Link to={"/my-passwords"}>
                  <KeyIcon />
                  {"My Password"}
                </Link>
              </li>
            </>
          ) : (
            <li className="m-3">
              <Link to={"/login"}>
                <PersonSharpIcon />
                {"Login"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
