import SalesChart from "./SalesChart";
import ProductSalesChart from "./ProductSalesChart";

const ChartGroup = () => {
  return (
    <div
      className="
        w-full flex flex-col space-x-6 items-center
        sm:flex-row space-y-4 h-max
    ">
      <SalesChart />
      <ProductSalesChart />
    </div>
  );
};

export default ChartGroup;
