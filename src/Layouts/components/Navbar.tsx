import AvatarComponent from "./Avatar";
import Drawer from "./Drawer";
import { Bell, Settings } from "lucide-react";
import { SearchModal } from "./SearchModal";
import NotificationSheet from "./NotificationSheet";
import CartItemsModal from "./CartItemsModal";
export const Navbar = () => {
  return (
    <nav
      className="
        w-full min-h-18  flex justify-between items-center p-3 bg-white/5 bg-clip-padding backdrop-filter bg-opacity-15 backdrop-blur-lg shadow-md
    ">
      <div
        className="
            flex space-x-4 items-center
        ">
        <span>
          <Drawer />
        </span>

        <span>
          <SearchModal />
        </span>
      </div>

      <div
        className="
            flex space-x-5 items-center
        ">
        <span className="size-max group p-2 rounded-full hover:bg-[#efefef] cursor-pointer">
          <Settings color="#ffffff" className="group-hover:stroke-[#1c1917]" />
        </span>
        <span className="size-max group p-2 rounded-full hover:bg-[#efefef] cursor-pointer">
          <CartItemsModal />
        </span>
        <AvatarComponent />
      </div>
    </nav>
  );
};
