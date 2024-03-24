import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import useLocalStorage from "@/hooks/useLocalStorage";

export const Main = () => {
  const accessToken = useLocalStorage("accessToken").getItem();
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
        {accessToken ? (
          <Outlet />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src="/401_PAGE.jfif"
              alt="401...UNAUTHOURIZED ACCESS"
              className="size-full rounded-md "
            />
            <p className="absolute top-2 text-foreground font-bold text-xl">
              YOU ARE UNAUHORIZED PLEASE GO BACK TO LOGIN
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
