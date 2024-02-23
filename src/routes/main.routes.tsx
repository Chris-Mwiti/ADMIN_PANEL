import App from "@/App";
import MainLayout from "@/Layouts/MainLayout";
import OrdersEdit from "@/pages/Orders/components/OrdersEdit";
import OrdersListTable from "@/pages/Orders/components/tables/OrderListTable";
import Products from "@/pages/Products";
import CreateProduct from "@/pages/Products/components/CreateProduct";
import ProductListTable from "@/pages/Products/tables/ProductListTable";
import { Route, Routes } from "react-router";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route element={<ProductListTable />} path="list" />
          <Route path="edit/:productId" />
          <Route path="create" element={<CreateProduct />} />
        </Route>
        <Route path="orders">
          <Route index element={<OrdersListTable />} />
          <Route path=":orderId" element={<OrdersEdit />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
