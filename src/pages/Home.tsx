import { InfoCardsLayout } from "./Home/components/cards/InfoCardsLayout";
import ChartGroup from "./Home/components/charts/ChartGroup";
import OrdersListTable from "./Orders/components/tables/OrderListTable";
import PreviewsOrdersTable from "./Orders/components/tables/preview.table";
import UserListTable from "./Users/tables/UserList";
import PreviewTable from "./Users/tables/preview.table";

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
          <PreviewTable />
          <PreviewsOrdersTable />
        </div>
      </div>
    </section>
  );
}
