import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useDeleteInvoice = (id: string) => {
  return useMutation({
    mutationKey: ["deleteInvoice", id],
    mutationFn: () =>
      axios
        .delete("http://localhost:1100/Invoices/" + id)
        .then((res) => res.status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Invoices"],
      });
    },
  });
};

export default useDeleteInvoice;
