import {
  Children,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { Link } from "react-router-dom";
import { HeaderItemProps } from "./types";

const HeaderItem = (props: HeaderItemProps) => {
  return (
    <div className="m-3 hover:shadow-2xl">
      <Link
        to={props.path}
        className="flex items-center justify-between gap-1 text-white"
        onClick={() => props.onClick && props.onClick()} //se tiver a props 'onClick' ele executa
      >
        {props.children}
        {props.text}
      </Link>
    </div>
  );
};

export default HeaderItem;
