import { ShoppingBag, ShoppingBasket, ShoppingCart, User2 } from "lucide-react";
import { InfoCard } from "./Home/components/InfoCard";
import { InfoCardsLayout } from "./Home/components/InfoCardsLayout";
import ChartGroup from "./Home/components/ChartGroup";

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
        <ChartGroup />
        <InfoCardsLayout />
      </div>
    </section>
  );
}
