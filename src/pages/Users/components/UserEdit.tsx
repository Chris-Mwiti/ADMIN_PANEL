import { useForm } from "react-hook-form";
import TUser, { userSchema } from "../schemas/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate, useParams } from "react-router";
import useUpdateUser from "../services/updateUser";
import useGetUsersById from "../services/getUserById";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import UserData, { findUser, replaceUsers } from "../data/userData";
import CreateButton from "@/components/ui_fallbacks/CreateButton";
import { useState } from "react";

const UserEdit = () => {
  const { userId } = useParams();

  const {data:userData, isLoading, isError,error,refetch} = useGetUsersById(userId);
  const {mutate,isPending,reset} = useUpdateUser(userId);

  const form = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      emailVerified: userData?.emailVerified,
      address: userData?.address || "Nairobi",
      phone: userData?.phone,
      company: userData?.company,
      avatarUrl: userData?.avatarUrl || "/avatar.jpg",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const onSubmit = (values: TUser) => {
    values.avatarUrl = "/avatar.jpg";
    mutate(values, {
      onSuccess(data, variables, context) {
        toast({
          title: "User created successfully",
          className: "bg-[#7cf988]",
          description: "The user was created successfully",
        });
        setTimeout(() => navigate("/users"), 2000);
      },
      onError(error, variables, context) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
          action: (
            <ToastAction altText="Retry" onClick={reset}>
              Retry
            </ToastAction>
          ),
        });
      },
    });
  };


  if(isLoading) return <TableLoading />
  if(isError) return <TableError error={error} retry={refetch} />
  
  if (userData) {
    return (
      <div className="w-full space-y-5 m-auto p-4">
        <p className="font-medium text-2xl text-slate-100">Edit user</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5">
            <Card>
              <CardContent className="flex flex-col justify-center items-center py-5 space-y-4">
                {/* @TODO:Add upload functionality to support image preview */}
                <FormField
                  control={form.control}
                  name="avatarUrl"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <div className="size-44 border border-dashed bg-gray-400/30 rounded-full flex items-center justify-center relative">
                        <img
                          src={field.value}
                          className="size-full rounded-full"
                        />
                      </div>
                      <FormDescription className="text-center w-[170px]">
                        Allowed *.jpeg, *jpg, *png, *gif max size of 3 Mb
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.avatarUrl}
                />

                <FormField
                  control={form.control}
                  name="emailVerified"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Verified</FormLabel>
                      <div className="flex space-x-3 items-center">
                        <FormDescription>
                          Disabling this will automatically send the user a
                          verification email
                        </FormDescription>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData.emailVerified}
                />
              </CardContent>
            </Card>

            {/* User Details section */}
            <Card>
              <CardContent className="grid grid-cols-0 xl:grid-cols-2 gap-3 py-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          className="py-6"
                          defaultValue={userData.firstName}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData.firstName}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          className="py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.lastName}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.email}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          className="py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.phone}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Address"
                          {...field}
                          className="py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.address}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Company"
                          {...field}
                          className="py-6"
                          defaultValue={userData.company}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.company}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Role" {...field} className="py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  defaultValue={userData?.role}
                />
              </CardContent>
            </Card>
            <CreateButton isPending={isPending} />
          </form>
        </Form>
      </div>
    );
  }
};

export default UserEdit;
