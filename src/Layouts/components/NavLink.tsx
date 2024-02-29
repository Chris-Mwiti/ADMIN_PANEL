import { LucideIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import NavPopover from "./NavPopover";
import { useState } from "react";

interface INavLink {
  title: string;
  icon: LucideIcon;
  urlPath: string;
  subUrlLinks?: string[];
}

const NavLinkItem = (props: INavLink) => {
  const [isActive, setIsActive] = useState(false);

  function changeActiveStatus(isActive: boolean) {
    setIsActive(isActive);
    return "";
  }
  return (
    <li
      className={`
            w-full group/nav_link flex items-center px-3 py-2  rounded-md hover:bg-[#efefef]/20
            cursor-pointer relative ${isActive ? "bg-primary/80" : ""}
            space-x-3
        `}>
      <props.icon color="#efefef" size="25px" />
      <NavLink
        to={props.urlPath}
        className={({ isActive }) => `${changeActiveStatus(isActive)}`}>
        <p
          className={`
            text-foreground w-full text-lg group-hover/nav_link:text-primary
        `}>
          {props.title}
        </p>
      </NavLink>
      <NavPopover subUrlLinks={props.subUrlLinks} urlPath={props.urlPath} />
    </li>
  );
};

export default NavLinkItem;
