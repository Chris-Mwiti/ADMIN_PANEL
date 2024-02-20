import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import NavPopover from "./NavPopover";

interface INavLink {
  title: string;
  icon: LucideIcon;
  urlPath: string;
  subUrlLinks?: string[];
}

const NavLink = (props: INavLink) => {
  return (
    <li
      className={`
            w-full group/nav_link flex items-center px-3 py-2  rounded-md hover:bg-[#efefef]/20
            cursor-pointer relative 
            space-x-3
        `}>
      <props.icon color="#efefef" size="25px" />
      <Link to={props.urlPath}>
        <p
          className={`
            text-[#efefef] w-full text-lg group-hover/nav_link:text-primary
        `}>
          {props.title}
        </p>
      </Link>
      <NavPopover subUrlLinks={props.subUrlLinks} urlPath={props.urlPath} />
    </li>
  );
};

export default NavLink;
