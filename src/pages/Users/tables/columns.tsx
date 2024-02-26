import { ColumnDef } from "@tanstack/react-table";
import TUsers from "../schemas/users.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Eye,
  MoreVertical,
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

const usersColumns: ColumnDef<TUsers>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected()||(table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorFn: row => `${row.name.firstName} ${row.name.lastName}`,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-3">
          <span className="size-14 rounded-full">
            <img
              src={row.original.avatar}
              className="size-full object-contain rounded-full"
              alt="A"
            />
          </span>
          <div className="flex flex-col space-y-2">
            <p className="text-slate-100 text-lg font-bold">
              {row.original.name.firstName + " " + row.original.name.lastName}
            </p>
            <p className="text-gray-200">{row.original.email}</p>
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
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <div className="text-slate-100 text-base">{phone}</div>;
    },
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
  },
  {
    accessorKey: "company",
    header: "Company",
    cell:({row}) => (
        <p className="text-slate-100 font-medium">{row.getValue("company")}</p>
    )
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
            <DropdownMenuItem onClick={() => navigate(`/users/${id}`)}>
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

export default usersColumns;
