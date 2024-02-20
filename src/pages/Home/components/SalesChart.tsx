import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export interface ISales {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
}
interface IResponseWeeklySales {
  id: string;
  WeeklySales: ISales;
}

function getSalesData() {
  return axios
    .get<IResponseWeeklySales>("http://localhost:1100/Sales/1")
    .then((res) => res.data);
}

const SalesChart = () => {
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["WeekSales"],
    queryFn: getSalesData,
  });

  if (isLoading) {
    return <SalesChartSkeleton />;
  }
  if (isError) {
    return (
      <SalesFallBackErrorElement retryFn={refetch} errMsg={error as Error} />
    );
  }

  if (data?.WeeklySales) {
    return (
      <div
        className="
        w-full h-[448px]
        xl:max-w-2xl
        rounded-lg
      ">
        <Card className="w-full h-full rounded-lg p-3">
          <CardTitle>Sales Data</CardTitle>
          <CardDescription>Weekly Sales Data</CardDescription>
          <CardContent
            className="
              w-full h-full
            ">
            <Chart
              type="line"
              series={data.WeeklySales.series}
              options={data.WeeklySales.options}
              width="100%"
              height={"100%"}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default SalesChart;

const SalesChartSkeleton = () => {
  return (
    <div
      className="
          w-full h-[448px]
          xl:max-w-md border rounded-lg
        ">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
};

const SalesFallBackErrorElement = (props: {
  retryFn: () => void;
  errMsg: Error;
}) => {
  return (
    <div
      className="
        w-full max-h-[448px]
        xl:max-w-md 
        ">
      <Card
        className="
            w-full h-full
          ">
        <CardHeader>
          <CardTitle>Error Has Occured</CardTitle>
          <CardDescription>
            An error has occured while trying to fetch chart data
          </CardDescription>
          <CardContent>{props.errMsg.message}</CardContent>
          <CardFooter
            className="
              flex items-center justify-center
            ">
            <Button variant={"destructive"} onClick={() => props.retryFn()}>
              Retry
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
};
