import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const AvatarComponent = () => {
  return (
    <Avatar className="text-foreground">
      <AvatarImage src="" />
      <Popover>
        <PopoverTrigger className="size-12 flex items-center justify-center ">
          <AvatarFallback className="flex size-full items-center justify-center ring ring-primary">
            CM
          </AvatarFallback>
        </PopoverTrigger>
        <PopoverContent className="bg-primary p-4 rounded-md">
          <div className="w-full space-y-3 flex flex-col">
            <span className="space-y-2">
              <p className="text-slate-100">Frank Maina</p>
              <p className="text-muted-foreground">frank@gmail.com</p>
            </span>

            <Separator />
            <Button variant={"ghost"}>Home</Button>
            <Button variant={"ghost"}>Profile</Button>
            <Button variant={"ghost"}>Settings</Button>

            <Separator />

            <Button variant={"destructive"}>Logout</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Avatar>
  );
};

export default AvatarComponent;
