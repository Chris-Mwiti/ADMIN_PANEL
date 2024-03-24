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
import useGetUsers from "@/pages/Users/services/getUsers";
import useGetProducts from "@/pages/Products/services/getProducts";
import useGetOrders from "@/pages/Orders/components/services/getOrders";
import TableLoading from "@/components/ui_fallbacks/TableLoading";
import TableError from "@/components/ui_fallbacks/TableError";

export const InfoCardsLayout = () => {
  const { data:users, error:usersErr, isLoading:usersLoading, refetch } = useGetUsers();
  const { data:products, error:productErr, isLoading:productLoading } = useGetProducts();
  const { data:orders, error:orderErr, isLoading:orderLoading } = useGetOrders();

  if(usersLoading || productLoading || orderLoading) return <TableLoading />
  if(usersErr || productErr || orderErr) return (<div className="w-full flex items-center justify-center text-destructive text-xl rounded-md font-bold border p-4">Error occcured while retriving data</div>)
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
        data={String(users.length)}
        bgColor="d6f7fa"
        textColor="003768"
      />
      <InfoCard
        icon={<Receipt color="#a06ddf" size={"50px"} />}
        title="Orders"
        data={String(orders.length)}
        bgColor="e8dcf9"
        textColor="7e6dad"
      />
      <InfoCard
        icon={<ShoppingCart color="#fdbb3b" size={"50px"} />}
        title="Weekly Sales"
        data={String(
          orders.filter((order) => order.status == "completed").length
        )}
        bgColor="fff5dd"
        textColor="ab8248"
      />
      <InfoCard
        icon={<Boxes color="#fb937a" size={"50px"} />}
        title="Products"
        data={String(products.length)}
        bgColor="ffe8e0"
        textColor="963740"
      />
    </div>
  );
};
