import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Thumbnails from "../components/Thumbnails";
import { format, subHours } from "date-fns";
import StockBar from "../components/StockBar";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Eye,
  MoreVertical,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import { TProductFormSchema } from "../schemas/product.schema";
import useDeleteProductById from "../services/deleteProduct";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/main";

export type Products = TProductFormSchema & {
  stockStatus: "out of stock" | "low stock" | "in stock";
};

export const tableColums: ColumnDef<Products>[] = [
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
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex space-x-4 items-center p-2">
        {/* @TODO: Replace the Thumbnail component to support cloudinary image component */}
        <Thumbnails image={row.original.productImages[0]} />
        <div className="flex flex-col space-y-4">
          <p className="text-slate-100 text-xl font-medium">
            {row.original.productName}
          </p>
          <p className="text-muted-foreground">
            {row.original.productCategory}
          </p>
        </div>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const formattedDate = format(date, "do MMM yyyy");
      const formatedTime = format(subHours(date, 4), "hh:mm aaa");

      return (
        <div className="p-3 m-auto space-y-3">
          <p className="text-slate-100 text-xl font-medium">{formattedDate}</p>
          <p className="text-muted-foreground">{formatedTime}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "stockStatus",
    header: "Stock",
    cell: ({ row }) => (
      <StockBar
        productQuantity={row.original.productQuantity}
        stockStatus={row.original.stockStatus}
      />
    ),
  },

  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sellingPrice"));

      const formatted = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "KSH",
      }).format(amount);

      return (
        <div className="text-right font-medium text-slate-100">{formatted}</div>
      );
    },
  },
  {
    accessorKey: "published",
    header: "Publish",
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("published")
            ? "bg-[#a380ff]/10 text-[#864dff] shadow-md"
            : "bg-slate-400/10 text-slate-300"
        } text-center p-2 rounded-md`}>
        {row.getValue("published") ? "Published" : "Draft"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id!;
      // @TODO: Refactor the following section: (Modularity required)
      const { mutate } = useDeleteProductById(id);
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
            <DropdownMenuItem>
              <Button variant={"ghost"} className="w-full">
                <Eye className=" size-4 mr-3" />
                View
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant={"destructive"}>
                <Trash2Icon color="#ff1309" className="mr-3 size-4" />
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default tableColums;
