import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/main";
import TInvoicesSchema from "../schemas/invoices.schema";

const useUpdateInvoice = (id: string) => {
  return useMutation({
    mutationKey: ["updateInvoice", id],
    mutationFn: (values: Partial<TInvoicesSchema>) =>
      axios
        .put("http://localhost:1100/Invoices/" + id, values)
        .then((res) => res.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Invoices"],
      });
    },
  });
};

export default useUpdateInvoice;
