import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Bell, File, FileCheck2, FileClock, ReceiptText } from "lucide-react";

const InvoicesOverview = () => {
  return (
    <Card className="max-w-max">
      <CardContent className="max-w-sm sm:max-w-2xl md:max-w-5xl p-0">
        <ScrollArea className="w-full p-3 border rounded-md whitespace-nowrap">
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
                <p className="text-muted-foreground">20 invoices</p>
                <p className="text-foreground font-medium">sh 40,000</p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-green-500 p-3">
                <FileCheck2
                  size={"40px"}
                  className=" fill-green-500"
                />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Paid</p>
                <p className="text-muted-foreground">20 invoices</p>
                <p className="text-foreground font-medium">sh 40,000</p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-orange-500 p-3">
                <FileClock
                  size={"40px"}
                  className="fill-orange-500"
                />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Pending</p>
                <p className="text-muted-foreground">20 invoices</p>
                <p className="text-foreground font-medium">sh 40,000</p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-red-500 p-3">
                <Bell
                  size={"40px"}
                  className="fill-red-500"
                />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Overdue</p>
                <p className="text-muted-foreground">20 invoices</p>
                <p className="text-foreground font-medium">sh 40,000</p>
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <span className="size-16 flex items-center justify-center rounded-full border-4 border-gray-500 p-3">
                <File
                  size={"40px"}
                  className="fill-gray-500"
                />
              </span>
              <span className="space-y-3">
                <p className="text-foreground font-medium">Draft</p>
                <p className="text-muted-foreground">20 invoices</p>
                <p className="text-foreground font-medium">sh 40,000</p>
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
