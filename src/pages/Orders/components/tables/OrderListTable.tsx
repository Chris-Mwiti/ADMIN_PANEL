import { useState } from "react";
import useGetOrders from "../services/getOrders";
import orderColumns from "./columns";
import { TOrdersSchema } from "../schemas/orders.schema";
import {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";
import orderData from "../data/orderData";
import { Card, CardContent } from "@/components/ui/card";

const OrdersListTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnsVisibility] = useState<VisibilityState>(
    {}
  );
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  //   API call to a fake database
  // const { isLoading, isError, error, data, refetch } = useGetOrders();
  const data = orderData;
  const table = useReactTable<TOrdersSchema>({
    data: data,
    columns: orderColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnsVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  });


  console.log(data);
  if (data) {
    return (
      <div className="w-full p-3">
        <p className="text-2xl text-slate-100 font-medium">Orders List</p>
        {/* @TODO:Extract filter section to be a component */}
        <div className="flex flex-col space-y-3 space-x-3 items-center py-4 sm:flex-row">
          {/* Filter orders serch field */}

          <Input
            placeholder="Filter orders..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("id")?.setFilterValue(e.target.value)
            }
            className="max-w-sm text-white"
          />

          {/* Filter order status select field */}
          <Select
            onValueChange={(value) =>
              table.getColumn("orderStatus")?.setFilterValue(value)
            }>
            <SelectTrigger className="max-w-sm text-white">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          {/* Columns filter dropdown field */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="ml-auto text-white w-full sm:w-max">
                Columns <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table Section */}
        <div className="rounded-md border">
          <Card>
            <CardContent>
              <Table>
                {/* Table Header */}
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={orderColumns.length}
                        className="h-24 text-center">
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Action Btns */}
          <div className="flex items-center justify-end space-x-2 py-4 px-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </div>

            {/* Pagination Btns */}
            <div className="space-x-2">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="text-white">
                Previous
              </Button>

              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="text-white">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrdersListTable;
