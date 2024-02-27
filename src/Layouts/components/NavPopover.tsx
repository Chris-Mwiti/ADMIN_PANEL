import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
interface INavPopOver {
  subUrlLinks?: string[];
  urlPath: string;
}
const NavPopover = (props: INavPopOver) => {
  return (
    <div
      className={`
        absolute
        right-0 h-full rounded-r-md rounded-br-md hover:bg-white/15
        flex items-center
        ${props.subUrlLinks?.length ? "flex" : "hidden"} 
        `}>
      <Popover>
        <PopoverTrigger>
          <ChevronRight color="#efefef" size={"25px"} />
        </PopoverTrigger>
        <PopoverContent className="bg-[#1c1917] w-32 border">
          <div className="flex flex-col space-y-2">
            {props.subUrlLinks?.map((url) => (
              <Link
                to={`${props.urlPath}/${url.replace("/", "")}`}
                key={`${props.urlPath}/${url}`}>
                <p className="text-white w-full divide-y hover:bg-[#efefef]/20 p-3 rounded-md">
                  {url.replace("/", "")}
                </p>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavPopover;
