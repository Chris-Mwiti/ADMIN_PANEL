import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const SearchModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="size-max rounded-full p-2 group hover:bg-[#efefef]">
        <SearchIcon color="#ffffff" className="group-hover:stroke-[#1c1917]" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-background dark:text-foreground">
        <DialogHeader>
          <DialogTitle>Search Box</DialogTitle>
          <DialogDescription>Enter your search item</DialogDescription>
        </DialogHeader>
        <div
          className="
                    flex space-x-2 w-full
                ">
          <Input type="text" placeholder="Enter your search" />
          <Button>Search</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
