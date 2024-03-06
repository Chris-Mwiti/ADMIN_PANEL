import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import loginSchema, { TLoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema, { TRegisterSchema } from "../schemas/register.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import useCreateUser from "../services/createUser";
import useLoginUser from "../services/loginUser";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const loginForm = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "jeremiah@dreamvile.com",
      password: "jeremiah",
    },
  });
  const registerForm = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "Jeremiah",
      lastName: "Cole",
      email: "jeremiah@dreamvile.com",
      password: "jeremiah",
      phone: "012345678",
    },
  });

  //Form submission hooks
  const { toast } = useToast();
  const navigate = useNavigate();
  // const { mutate } = useCreateUser();
  // const {mutate: submitLogin} = useLoginUser();
  
  //Form Submit handlers
  const loginSubmit = (values: TLoginSchema) => {
    if (
      values.email !== "jeremiah@dreamvile.com" ||
      values.password !== "jeremiah"
    ) {
      toast({
        className: "bg-destructive",
        title: "Invalid login",
        description: "Wrong credentials",
      });
    } else {
      toast({
        className: "bg-primary/90",
        title: "Login success",
        description: "Welcome back jeremiah cole",
      });

      setTimeout(() => navigate("/"), 2000);
    }
    // submitLogin(values);
  };

  const registerSubmit = (values: TRegisterSchema) => {
    console.log(values);
    values.role = "admin";
    // mutate(values);
  };

  const [toogleVisisbility, setVisibility] = useState(false);
  return (
    <div className="w-screen h-screen p-4 flex flex-col items-center justify-center dark:bg-background space-y-3">
      <p className="text-primary font-logo text-center text-5xl rubik-glitch-regular">
        MADRIGAL PANEL
      </p>
      <Tabs defaultValue="login" className=" w-full md:w-[800px] space-y-4">
        <div className="bg-primary/10 w-full h-10 rounded-md flex justify-center items-center space-x-3">
          <Info className="stroke-primary size-5" />
          <span className="text-foreground">
            {" "}
            Please use the default values to login
          </span>
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register" disabled>
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login into your account</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              <Form {...loginForm}>
                <form
                  className="space-y-3"
                  onSubmit={loginForm.handleSubmit(loginSubmit)}>
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    defaultValue="jeremiah@dreamvile.com"
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    defaultValue="jeremiah"
                  />

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>
              <Button
                variant="outline"
                className="text-4xl h-max text-primary"
                disabled>
                G
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Register content */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account</CardDescription>
              <CardContent className="space-y-4">
                <Form {...registerForm}>
                  <form
                    className="grid grid-cols-2 gap-4"
                    onSubmit={registerForm.handleSubmit(registerSubmit)}>
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="First name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Last name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Email address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Password</FormLabel>
                          <div className="flex space-x-1 items-center">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Password"
                                type={toogleVisisbility ? "text" : "password"}
                              />
                            </FormControl>
                            <span
                              className="size-max rounded-full p-2 cursor-pointer hover:bg-slate-400/10"
                              onClick={() => setVisibility((prev) => !prev)}>
                              {toogleVisisbility ? <EyeOff /> : <Eye />}
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="col-span-2" type="submit">
                      Create account
                    </Button>
                  </form>
                </Form>

                <Button
                  variant="outline"
                  className="text-4xl h-max text-primary w-full"
                  disabled>
                  G
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterForm;