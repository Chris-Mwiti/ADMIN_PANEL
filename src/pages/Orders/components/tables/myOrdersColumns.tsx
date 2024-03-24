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
import handleImageTransformation from "@/utils/imageUrlGenerator";

const myOrdersColumns: ColumnDef<TOrdersSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() as boolean) ||
          "indeterminate"
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
    id: "ProductInfo",
    header: "ProductInfo",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-3">
          <span className="size-14 rounded-md">
            {row.original.items.length ? (
              <img
                src={handleImageTransformation(row.original.items[0].product.asset[0].images[0])}
                alt="A"
                className="size-full rounded-md"
              />
            ) : (
              <span className="size-full rounded-md bg-primary text-card-foreground flex items-center justify-center text-xl font-bold">
                U
              </span>
            )}
          </span>
          <div className="flex flex-col space-y-2">
            <p className="text-slate-100 text-lg font-bold">
              {row.original.items[0].product.productName}
            </p>
            <p className="text-gray-200">{row.original.items[0].quantity}</p>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "orderDate",
    header: "Date",
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
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => {
      const items = row.original.items.length;
      return <div className="text-slate-100 text-base">{items}</div>;
    },
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
            <DropdownMenuItem onClick={() => navigate(`/orders/${id}`)}>
              <Button variant={"ghost"} className="w-full">
                <Eye className=" size-4 mr-3" />
                View
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/orders/myOrdersEdit/${id}`)}>
              <Button variant={"ghost"} className="w-full">
                <Pencil className="mr-3 size-4" />
                Edit
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default myOrdersColumns;
