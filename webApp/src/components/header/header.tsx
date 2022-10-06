import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect, useState } from "react";

export default function Header() {
  const authService = new AuthService();
  const [userPerfil, setUserPerfil] = useState("");

  useEffect(() => {
    let loggedUserAux = authService.getLoggedUser();
    setUserPerfil(loggedUserAux != null ? loggedUserAux.UserName : "");
  })

  return (
    <header className="flex justify-end h-12  bg-slate-800">
      <ul className="flex">
        <li className="m-3">
          <Link to="/home">
            <HomeRoundedIcon />
            Home
          </Link>
        </li>
        <li className="m-3">
          <Link to="/">
            <PersonSharpIcon />
          </Link>
        </li>
        <li className="m-3">
          <Link to={"/" + userPerfil}>
            <PersonSharpIcon />
            {userPerfil}
          </Link>
        </li>
      </ul>
    </header>
  );
}
