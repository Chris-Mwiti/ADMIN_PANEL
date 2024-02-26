import React, { useState } from "react"
import { TUserDetails, TUserInfo } from "./InvoicesCreate"
import useGetUsers from "@/pages/Users/services/getUsers";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, UserPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import TUser from "@/pages/Users/schemas/users.schema";
import UserData from "@/pages/Users/data/userData";

interface IUserModalProp {
    setCurrentUser: React.Dispatch<React.SetStateAction<TUserDetails>>
}

const UsersModal = (props:IUserModalProp) => {
    const [openModal,setOpenModal] = useState(false);
    // const {data,isLoading,isError,error,refetch} = useGetUsers();

    const data = UserData;
    const navigate = useNavigate();

    // if(isLoading) return <TableLoading />
    // if(isError) return <TableError error={error} retry={refetch} />

    const manipulateData = (values:TUser): TUserDetails => {
        setOpenModal(false);
        return {
            name: `${values.name.firstName} ${values.name.lastName}`,
            email: values.email,
            phone: values.phone,
            address: values.address,
            company: values.company
        }
    }
  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="size-12 rounded-full" onClick={() => setOpenModal(true)}>
          <Pencil className="size-full" color="#efefef" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h- overflow-y-auto">
          <DialogHeader className="flex justify-between">
            <DialogTitle>Customers</DialogTitle>
            <Button
              className="bg-slate-300"
              onClick={() => navigate("/users/create")}>
              <UserPlus size={"23px"} />
            </Button>
          </DialogHeader>

         <div className="flex flex-col space-y-3 w-full">
            {data?.map(value => (
                <div className="w-full space-y-2 rounded-md p-2 hover:bg-slate-300 cursor-pointer" key={value.id} onClick={() => props.setCurrentUser(manipulateData(value))}>
                    <p className="text-slate-600 font-medium text-lg">
                        {value.name.firstName + " " + value.name.lastName}
                    </p>
                    <p className="text-violet-700 font-medium">{value.company}</p>
                    <p className="text-muted-foreground">{value.address}</p>
                    <p className="text-muted-foreground">{value.phone}</p>
                </div>
            ))}
         </div>
      </DialogContent>
    </Dialog>
  );
}

export default UsersModal