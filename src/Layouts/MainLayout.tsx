import SideBar from "./components/SideBar";
import { Main } from "./components/Main";

export default function MainLayout() {
  return (
    <div
      className="
            w-full min-h-full max-h-screen flex items-start dark dark:bg-background relative overflow-hidden
        ">
      <SideBar />
      <Main />
    </div>
  );
}
