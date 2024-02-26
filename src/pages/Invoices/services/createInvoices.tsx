import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import TInvoicesSchema from "../schemas/invoices.schema";
import { queryClient } from "@/main";

const useCreateInvoices = () => {
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: (values: TInvoicesSchema) =>
      axios
        .post("http://localhost:1100/Invoices", values)
        .then((res) => res.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Invoices"],
      });
    },
  });
};

export default useCreateInvoices;
