import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TInvoicesSchema from "../schemas/invoices.schema";
const useGetInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ["Invoices", id],
    queryFn: () =>
      axios
        .get<TInvoicesSchema>("http://localhost:1100/Invoices/" + id)
        .then((res) => res.data),
  });
};

export default useGetInvoiceById;
