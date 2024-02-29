import invoiceData from "../data/invoiceData";
import TInvoicesSchema from "../schemas/invoices.schema";
export type TInvoicesStatus =
  | "pending"
  | "overdue"
  | "paid"
  | "draft"
  | "total";

const evaluateInvoices = (data: TInvoicesSchema[], status: TInvoicesStatus) => {
  // @TODO: Optimize by use of useMemo and useCallBack to increase page speed load
  const filteredInvoicesByStatus = data.filter((invoice) => {
    if (status == "total") return data;
    return invoice.status == status;
  });

  const calculateTotal = (accum: number, detail: { [key: string]: string }) =>
    (accum += parseInt(detail.price) * parseInt(detail.quantity));
  const total = filteredInvoicesByStatus.reduce(
    (accum, invoice) =>
      (accum += invoice.invoiceDetails.reduce(calculateTotal, 0)),
    0
  );

  return {
    length: filteredInvoicesByStatus.length,
    total,
  };
};

export default evaluateInvoices;
