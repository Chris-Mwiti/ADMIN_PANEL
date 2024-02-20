import { LucideIcon } from "lucide-react";
import NavPopover from "./NavPopover";
import { Link } from "react-router-dom";
interface IMobileNavLinks {
  icon: LucideIcon;
  subUrlLinks?: string[];
  urlPath: string;
  title: string;
}
const MobileNavLinks = (props: IMobileNavLinks) => {
  return (
    <li
      className="
            w-full group/nav_link flex space-x-4 items-center px-3 py-2  rounded-md hover:bg-[#efefef]/20
            cursor-pointer mt-3  relative
        ">
      <props.icon color="#efefef" size={"25px"} />
      <Link to={props.urlPath}>
        <p className="text-[#efefef] text-lg group-hover/nav_link:text-primary">
          {props.title}
        </p>
      </Link>
      <NavPopover subUrlLinks={props.subUrlLinks} urlPath={props.urlPath} />
    </li>
  );
};

export default MobileNavLinks;
