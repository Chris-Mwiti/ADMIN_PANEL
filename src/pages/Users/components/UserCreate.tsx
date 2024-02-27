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
import userData from "../data/userData";
import { useNavigate } from "react-router";
import { useState } from "react";

const UserCreate = () => {
  const form = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: {
        firstName: "",
        lastName: "",
      },
      email: "",
      emailVerified: true,
      address: "",
      phone: "",
      company: "",
      avatar: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
    //   const {isPending, reset ,mutate} = useCreateUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const onSubmit = (values: TUser) => {
    values.avatar = "/avatar.jpg";
    userData.push(values);
    toast({
      title: "User created successfully",
      className: "bg-[#7cf988]",
      description: "The user was created successfully",
    });
    setTimeout(() => navigate("/users"), 2000);
    // mutate(values, {
    //     onSuccess(data, variables, context) {
    //         toast({
    //           title: "User created successfully",
    //           className: "bg-[#7cf988]",
    //           description: "The user was created successfully",
    //         });
    //     },
    //     onError(error, variables, context) {
    //         toast({
    //           variant: "destructive",
    //           title: "Error",
    //           description: error.message,
    //           action: (
    //             <ToastAction altText="Retry" onClick={reset}>
    //               Retry
    //             </ToastAction>
    //           ),
    //         });
    //     },
    // })
  };
  return (
    <div className="w-full space-y-5 m-auto p-4">
      <p className="font-medium text-2xl text-slate-100">Create a new user</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5">
          <Card>
            <CardContent className="flex flex-col justify-center items-center py-5 space-y-4">
              {/* @TODO:Add upload functionality to support image preview */}
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <div className="size-44 border border-dashed bg-gray-400/30 rounded-full flex items-center justify-center relative">
                      <label
                        htmlFor="avatar"
                        className="size-full rounded-full group relative">
                        <FormControl className="absolute z-10">
                          <Input
                            type="file"
                            {...field}
                            className="size-full invisible flex items-center justify-center file:hidden selection:hidden rounded-full"
                            placeholder="Upload photo"
                          />
                        </FormControl>
                        <div className="size-full rounded-full flex flex-col items-center justify-center -z-10 ">
                          <Camera size={"50px"} color="#efefef" />
                          <p className="font-medium text-foreground">
                            Upload Photo
                          </p>
                        </div>
                      </label>
                    </div>
                    <FormDescription className="text-center w-[170px]">
                      Allowed *.jpeg, *jpg, *png, *gif max size of 3 Mb
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
              />
            </CardContent>
          </Card>

          {/* User Details section */}
          <Card>
            <CardContent className="grid grid-cols-0 xl:grid-cols-2 gap-3 py-3">
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastName"
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
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} className="py-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
              />
            </CardContent>
          </Card>
          <Button className=" justify-self-end" type="submit" disabled={isDisabled}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserCreate;
