import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TInvoicesSchema from "../schemas/invoices.schema";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, MoreVertical } from "lucide-react";
import { addHours, format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

const invoicesColumns: ColumnDef<TInvoicesSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          InvoiceId
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-slate-100">{row.getValue("id")}</div>
      );
    },
    enableHiding: false,
  },

  {
    id: "firstName",
    header: "Customer",
    accessorFn: (row) => `${row.invoiceInfo.to.name}`,
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <div className="flex space-x-3">
          <span className="size-14 rounded-full">
            <div className="size-full rounded-full bg-cyan-300/30 text-slate-100 flex items-center justify-center text-2xl">
              {row.original.invoiceInfo.to.name.slice(0, 1)}
            </div>
          </span>
          <div className="flex flex-col space-y-2">
            <p className="text-slate-100 text-lg font-bold">
              {row.original.invoiceInfo.to.name}
            </p>
            <p className="text-gray-200">{row.original.invoiceInfo.to.email}</p>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formatedDate = format(row.original.createdAt, "do MMM yyy");
      const formatedTime = format(
        addHours(row.original.createdAt, 3),
        "hh:mm aaa"
      );

      return (
        <div className="space-y-2 m-auto">
          <p className="text-slate-100 text-lg font-medium">{formatedDate}</p>
          <p className="text-muted-foreground"> {formatedTime}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ row }) => {
      const formatedDate = format(row.original.dueDate, "do MMM yyy");
      const formatedTime = format(
        addHours(row.original.dueDate, 3),
        "hh:mm aaa"
      );

      return (
        <div className="space-y-2 m-auto">
          <p className="text-slate-100 text-lg font-medium">{formatedDate}</p>
          <p className="text-muted-foreground"> {formatedTime}</p>
        </div>
      );
    },
  },

  {
    id: "sent",
    accessorFn: (row) => `${row.invoiceDetails.length}`,
    header: "Sent",
    cell: ({ row }) => {
      return (
        <div className="text-slate-100 text-base">{row.getValue("sent")}</div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const bgClass: { [key: string]: string } = {
        overdue: "bg-red-400/30 text-red-200",
        paid: "bg-green-300/30 text-green-500",
        pending: "bg-orange-300/30 text-orange-500",
        draft: "bg-gray-300/30 text-gray-200",
      };
      return (
        <div
          className={`${bgClass[status]} p-2 rounded-md text-center shadow-lg`}>
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id!;
      // @TODO: Refactor the following section: (Modularity required)
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="size-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-full" color="#efefef" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-200 p-3 rounded-md">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate(`/invoices/${id}`)}>
              <Button variant={"ghost"} className="w-full">
                <Eye className=" size-4 mr-3" />
                View
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default invoicesColumns;
