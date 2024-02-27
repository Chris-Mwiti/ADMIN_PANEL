import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const Main = () => {
  return (
    <main
      className="
          flex flex-1  flex-col dark:bg-background 
          relative max-h-screen overflow-hidden
        ">
      <Navbar />
      <div
        className="
          py-3 self-center flex-1 w-full
          overflow-x-hidden overflow-y-auto 
          sm:px-3 min-h-full
          main 
        ">
        <Outlet />
      </div>
    </main>
  );
};
