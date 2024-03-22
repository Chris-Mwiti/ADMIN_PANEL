import React from "react";
import { InfoCard } from "./InfoCard";
import {
  Boxes,
  Receipt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  User2,
  Users2,
} from "lucide-react";
import UserData from "@/pages/Users/data/userData";
import orderData from "@/pages/Orders/components/data/orderData";
import productData from "@/pages/Products/data/productData";

export const InfoCardsLayout = () => {
  return (
    <div
      className="
            grid
            gap-3
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-none
            xl:flex
            xl:space-x-5
            xl:w-full
            xl:items-center
            xl:justify-around
          ">
      <InfoCard
        icon={<Users2 color="#64d3e4" size={"50px"} />}
        title="Users"
        data={String(UserData.length)}
        bgColor="d6f7fa"
        textColor="003768"
      />
      <InfoCard
        icon={<Receipt color="#a06ddf" size={"50px"} />}
        title="Orders"
        data={String(orderData.length)}
        bgColor="e8dcf9"
        textColor="7e6dad"
      />
      <InfoCard
        icon={<ShoppingCart color="#fdbb3b" size={"50px"} />}
        title="Weekly Sales"
        data={String(
          orderData.filter((order) => order.status == "completed").length
        )}
        bgColor="fff5dd"
        textColor="ab8248"
      />
      <InfoCard
        icon={<Boxes color="#fb937a" size={"50px"} />}
        title="Products"
        data={String(productData.length)}
        bgColor="ffe8e0"
        textColor="963740"
      />
    </div>
  );
};
