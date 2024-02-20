import AvatarComponent from "./Avatar";
import Drawer from "./Drawer";
import { Bell, Settings, User, Users } from "lucide-react";
import { SearchModal } from "./SearchModal";
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
        <span>
          <Bell color="#ffffff" />
        </span>
        <span>
          <User color="#ffffff" />
        </span>
        <span>
          <Settings color="#ffffff" />
        </span>
        <AvatarComponent />
      </div>
    </nav>
  );
};
