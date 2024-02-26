import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TInvoicesSchema from "../schemas/invoices.schema";

const useGetInvoices = () => {
  return useQuery({
    queryKey: ["Invoices"],
    queryFn: () =>
      axios.get<TInvoicesSchema[]>("http://localhost:1100/Invoices").then((res) => res.data),
  });
};

export default useGetInvoices;
