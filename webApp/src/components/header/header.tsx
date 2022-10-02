import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to="/">
            <PersonSharpIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
