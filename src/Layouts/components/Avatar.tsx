import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { useRegisterActions, useUserInfo } from "@/contexts/data.store";
import { useUserActions } from "@/pages/Users/data/user.store";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const AvatarComponent = () => {
  const userInfo = useUserInfo();
  const { logoutUser } = useRegisterActions();
  return (
    <Avatar className="text-foreground">
      <AvatarImage src="" />
      <Popover>
        <PopoverTrigger className="size-12 ">
          <AvatarFallback className="flex border items-center justify-center ring ring-primary">
            {userInfo.firstName ? userInfo.firstName.slice(0, 2).toLocaleUpperCase() : ""}
          </AvatarFallback>
        </PopoverTrigger>
        <PopoverContent
          className="bg-[#1c1917] p-4 rounded-md z-600"
          align="start"
          alignOffset={20}>
          <div className="w-full space-y-3 flex flex-col">
            <span className="space-y-2">
              <p className="text-slate-100">{userInfo.firstName}</p>
              <p className="text-muted-foreground">{userInfo.email}</p>
            </span>

            <Separator />
            <Button variant={"ghost"}>Home</Button>
            <Button variant={"ghost"}>Profile</Button>
            <Button variant={"ghost"}>Settings</Button>

            <Separator />

            <Button variant={"destructive"} onClick={logoutUser}>Logout</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Avatar>
  );
};

export default AvatarComponent;
