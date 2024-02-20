import { useState } from "react";
import { NavLinks } from "./NavLinks";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SideBar() {
  const [toogleSideBarStatus, setToogleSideBar] = useState(true);

  return (
    <div
      className={`
        w-[255px]
        h-full hidden border-r-2 border-dashed 
        bg-background/90 bg-opacity-15 backdrop-filter bg-clip-padding backdrop-blur-sm
        transition ease-in delay-100 duration-100
        xl:flex sm:flex-col sm:space-y-3
      `}>
      <NavLinks isResizable isWidthAdjusted={toogleSideBarStatus} />
    </div>
  );
}
