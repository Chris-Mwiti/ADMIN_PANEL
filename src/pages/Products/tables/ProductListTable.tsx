import { useState } from "react";
import useGetProducts from "../services/getProducts";
import tableColums, { Products } from "./columns";
import {
  ColumnFiltersState,
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductListTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnsVisibility] = useState<VisibilityState>(
    {}
  );
  const [rowSelection, setRowSelection] = useState({});

  //   API call to a fake database
  const { isLoading, isError, error, data, refetch } = useGetProducts();
  const table = useReactTable<Products>({
    data: data as Products[],
    columns: tableColums,
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
    },
  });

  if (isLoading) {
    return <ProductListLoading />;
  }

  if (isError) {
    return <ProductErrorFallBack error={error} retry={refetch} />;
  }

  if (data) {
    return (
      <div className="w-full">
        {/* @TODO:Extract filter section to be a component */}
        <div className="flex flex-col items-center py-4 sm:flex-row">
          <Input
            placeholder="Filter products..."
            value={
              (table.getColumn("productName")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("productName")?.setFilterValue(e.target.value)
            }
            className="max-w-sm text-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="ml-auto text-white">
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
                    colSpan={tableColums.length}
                    className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

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
                className="text-white"
            >
                Previous
              </Button>

              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="text-white"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const ProductListLoading = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Skeleton className="w-full" />
      </CardContent>
    </Card>
  );
};

const ProductErrorFallBack = ({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>{error.message}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button variant={"destructive"} onClick={() => retry()}>
          Retry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductListTable;
