import { ShoppingBag, ShoppingBasket, ShoppingCart, User2 } from "lucide-react";
import { InfoCard } from "./Home/components/cards/InfoCard";
import { InfoCardsLayout } from "./Home/components/cards/InfoCardsLayout";
import ChartGroup from "./Home/components/charts/ChartGroup";

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
      </div>
    </section>
  );
}
