import React, { useState } from "react";
import { TUserDetails, TUserInfo } from "./InvoicesCreate";
import useGetUsers from "@/pages/Users/services/getUsers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, UserPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import TUser from "@/pages/Users/schemas/users.schema";
import UserData from "@/pages/Users/data/userData";

interface IUserModalProp {
  setCurrentUser: React.Dispatch<React.SetStateAction<TUserDetails>>;
}

const UsersModal = (props: IUserModalProp) => {
  const [openModal, setOpenModal] = useState(false);
  // const {data,isLoading,isError,error,refetch} = useGetUsers();

  const data = UserData;
  const navigate = useNavigate();

  // if(isLoading) return <TableLoading />
  // if(isError) return <TableError error={error} retry={refetch} />

  const manipulateData = (values: TUser): TUserDetails => {
    setOpenModal(false);
    return {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      address: values.address,
      company: values.company,
    };
  };
  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button
          className="size-12 rounded-full "
          onClick={() => setOpenModal(true)}>
          <Pencil className="size-full" color="#efefef" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[450px] overflow-y-auto bg-[#1c1917] rounded-md">
        <DialogHeader className="flex justify-between">
          <DialogTitle className="text-primary font-medium text-xl">
            Customers
          </DialogTitle>
          <Button onClick={() => navigate("/users/create")}>
            <UserPlus size={"23px"} />
          </Button>
        </DialogHeader>

        <div className="flex flex-col space-y-3 w-full">
          {data?.map((value) => (
            <div
              className="w-full space-y-2 rounded-md p-2 hover:bg-[#efefef]/10 cursor-pointer"
              key={value.id}
              onClick={() => props.setCurrentUser(manipulateData(value))}>
              <p className="text-slate-600 font-medium text-lg">
                {value.firstName + " " + value.lastName}
              </p>
              <p className="text-primary font-medium">{value.company}</p>
              <p className="text-muted-foreground">{value.address}</p>
              <p className="text-muted-foreground">{value.phone}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UsersModal;
