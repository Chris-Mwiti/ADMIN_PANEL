import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { ISales } from "./SalesChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import chartData from "../data/chart";
import { ApexOptions } from "apexcharts";

type TSales = {
  type: string;
} & ISales;
interface IProductSales {
  id: string;
  sales: TSales[];
}

const ProductSalesChart = () => {
  // const { isLoading, isError, data, error, refetch } = useQuery({
  //   queryKey: ["ProductSales"],
  //   queryFn: () =>
  //     axios
  //       .get<IProductSales>("http://localhost:1100/ProductSales/1")
  //       .then((res) => res.data),
  // });

  // if (isLoading) return <ProductSalesLoadingChart />;

  // if (isError)
  //   return <ProductSalesErrorFallBack error={error} refetchFn={refetch} />;

  const data = chartData.ProductSales.find(value => value.id == "1");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Sales</CardTitle>
        <CardDescription>Weekly product sales</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          type="pie"
          series={data?.sales[0].series}
          options={data?.sales[0].options as ApexOptions}
          width={"440px"}
        />
      </CardContent>
    </Card>
  );
};

const ProductSalesLoadingChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading....</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="size-[200px] sm:size[400px] rounded-full" />
      </CardContent>
    </Card>
  );
};

const ProductSalesErrorFallBack = ({
  error,
  refetchFn,
}: {
  error: Error;
  refetchFn: () => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Occurred</CardTitle>
        <CardDescription>{error.message}</CardDescription>
      </CardHeader>
      <CardContent className=" flex justify-center">
        <Button variant={"destructive"} onClick={() => refetchFn()}>
          Retry
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductSalesChart;
