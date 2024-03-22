import { ColumnDef } from "@tanstack/react-table";
import { TOrdersSchema } from "../schemas/orders.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  MoreVertical,
  Pencil,
} from "lucide-react";
import { addHours, format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

const previewOrderColumns
: ColumnDef<TOrdersSchema>[] = [
  
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Order
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
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-3">
          <span className="size-14 rounded-full">
            {row.original.user.avatarUrl ? (
              <img
                src={row.original.user.avatarUrl}
                alt="A"
                className="size-full rounded-full"
              />
            ) : (
              <span className="size-full rounded-full bg-primary text-card-foreground flex items-center justify-center text-xl font-bold">
                U
              </span>
            )}
          </span>
          <div className="flex flex-col space-y-2">
            <p className="text-slate-100 text-lg font-bold">
              {row.original.user.firstName}
            </p>
            <p className="text-gray-200">{row.original.user.id}</p>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },



  {
    accessorKey: "totalOrderPrice",
    header: "Price",
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("en-us", {
        currency: "KSH",
        style: "currency",
      }).format(Number(row.original.total));

      return <p className="text-slate-100 font-medium">{price}</p>;
    },
  },

  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const bgClass: { [key: string]: string } = {
        canceled: "bg-red-400/30 text-gray-200",
        completed: "bg-green-300/30 text-green-500",
        pending: "bg-orange-300/30 text-orange-500",
        refunded: "bg-gray-400/30 text-gray-200",
      };
      return (
        <div
          className={`${bgClass[status]} p-2 rounded-md text-center shadow-lg`}>
          {status}
        </div>
      );
    },
  },

];

export default previewOrderColumns
;
