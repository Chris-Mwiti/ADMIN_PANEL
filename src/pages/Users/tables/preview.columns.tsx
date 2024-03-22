import { ColumnDef } from "@tanstack/react-table";
import TUsers from "../schemas/users.schema";
import { Checkbox } from "@/components/ui/checkbox";
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

const previewColumns: ColumnDef<TUsers>[] = [

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          UserId
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
    id: "fullName",
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-3">
          <span className="size-14 rounded-full">
            {row.original.avatarUrl ? (
              <img
                src={row.original.avatarUrl}
                className="size-full object-contain rounded-full"
                alt="A"
              />
            ) : (
              <span className="size-full rounded-full bg-primary font-bold text-lg">
                U
              </span>
            )}
          </span>
          <div className="flex flex-col space-y-2">
            <p className="text-slate-100 text-lg font-bold">
              {row.original.firstName + " " + row.original.lastName}
            </p>
            <p className="text-gray-200">{row.original.email}</p>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },


  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const bgClass: { [key: string]: string } = {
        banned: "bg-red-400/30 text-red-200",
        active: "bg-green-300/30 text-green-500",
        pending: "bg-orange-300/30 text-orange-500",
      };
      return (
        <div
          className={`${bgClass[status]} p-2 rounded-md text-center shadow-lg`}>
          {status}
        </div>
      );
    },
  }
];

export default previewColumns;
