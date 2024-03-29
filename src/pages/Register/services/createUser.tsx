import AxiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import { TRegisterSchema } from "../schemas/register.schema";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import axios from "axios";

const useCreateUser = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: (values: TRegisterSchema) =>
      axios
        .post(
          "https://juice-hub-ts-server-dzctfefp4-chrismwitis-projects.vercel.app/auth/register",
          values
        )
        .then((res) => res.data),
    onSuccess(data, variables, context) {
      toast({
        title: "User created successfully",
        description:
          "Your account has been created successfully. Plesae login to access the dashboard",
      });
    },
    onError(error, variables, context) {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
};

export default useCreateUser;
