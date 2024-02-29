import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Bell, File, FileCheck2, FileClock, ReceiptText } from "lucide-react";
import evaluateInvoices from "../util/evaluateInvoices";
import TInvoicesSchema from "../schemas/invoices.schema";

const InvoicesOverview = ({
  invoiceData,
}: {
  invoiceData: TInvoicesSchema[];
}) => {
  const pendingOverview = evaluateInvoices(invoiceData, "pending");
  const totalOverview = evaluateInvoices(invoiceData, "total");
  const paidOverview = evaluateInvoices(invoiceData, "paid");
  const draftOverview = evaluateInvoices(invoiceData, "draft");
  const overdueOverview = evaluateInvoices(invoiceData, "overdue");
  return (
    <Card className="max-w-max border-none">
      <CardContent className="max-w-sm sm:max-w-2xl md:max-w-5xl p-3">
        <ScrollArea className="w-full p-3  rounded-md whitespace-nowrap">
          <div className="w-full flex space-x-10">
            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-cyan-500 p-3">
                <ReceiptText
                  size={"40px"}
                  className="stroke-cyan-200 fill-cyan-500"
                />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Total</p>
                <p className="text-muted-foreground">
                  {totalOverview.length} invoices
                </p>
                <p className="text-foreground font-medium">
                  sh {totalOverview.total}
                </p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-green-500 p-3">
                <FileCheck2 size={"40px"} className=" fill-green-500" />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Paid</p>
                <p className="text-muted-foreground">
                  {paidOverview.length} invoices
                </p>
                <p className="text-foreground font-medium">
                  sh {paidOverview.total}
                </p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-orange-500 p-3">
                <FileClock size={"40px"} className="fill-orange-500" />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Pending</p>
                <p className="text-muted-foreground">
                  {pendingOverview.length} invoices
                </p>
                <p className="text-foreground font-medium">
                  sh {pendingOverview.total}
                </p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-red-500 p-3">
                <Bell size={"40px"} className="fill-red-500" />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Overdue</p>
                <p className="text-muted-foreground">
                  {overdueOverview.length} invoices
                </p>
                <p className="text-foreground font-medium">
                  sh {overdueOverview.total}
                </p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-gray-500 p-3">
                <File size={"40px"} className="fill-gray-500" />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Draft</p>
                <p className="text-muted-foreground">
                  {draftOverview.length} invoices
                </p>
                <p className="text-foreground font-medium">
                  sh {draftOverview.total}
                </p>
              </span>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InvoicesOverview;
