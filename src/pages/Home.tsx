import { InfoCardsLayout } from "./Home/components/cards/InfoCardsLayout";
import ProductSalesChart from "./Home/components/charts/ProductSalesChart";
import SalesChart from "./Home/components/charts/SalesChart";

export default function Home() {
  return (
    <section
      className="
      w-full min-h-full flex flex-col 
    ">
      <div
        className="
        w-full h-max
        max-w-full
        flex flex-col space-y-6 justify-center
        px-3
      ">
        <InfoCardsLayout />
        {/* <ChartGroup /> */}
        <div className="grid grid-cols-2 gap-3 h-max">
          <ProductSalesChart />
          <SalesChart />
        </div>
      </div>
    </section>
  );
}
