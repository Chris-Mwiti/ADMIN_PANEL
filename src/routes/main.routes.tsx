import App from "@/App";
import MainLayout from "@/Layouts/MainLayout";
import Invoices from "@/pages/Invoices";
import InvoicesCreate from "@/pages/Invoices/components/InvoicesCreate";
import InvoicesView from "@/pages/Invoices/components/InvoicesView";
import OrdersEdit from "@/pages/Orders/components/OrdersEdit";
import OrdersListTable from "@/pages/Orders/components/tables/OrderListTable";
import Products from "@/pages/Products";
import CreateProduct from "@/pages/Products/components/CreateProduct";
import ProductsEdit from "@/pages/Products/components/ProductsEdit";
import ProductsView from "@/pages/Products/components/ProductsView";
import ProductListTable from "@/pages/Products/tables/ProductListTable";
import RegisterForm from "@/pages/Register/pages/Register";
import UserCreate from "@/pages/Users/components/UserCreate";
import UserEdit from "@/pages/Users/components/UserEdit";
import UserListTable from "@/pages/Users/tables/UserList";
import { Route, Routes } from "react-router";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" index element={<RegisterForm />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="users">
          <Route index element={<UserListTable />} />
          <Route path="create" element={<UserCreate />} />
          <Route path=":userId" element={<UserEdit />} />
        </Route>
        <Route path="products">
          <Route index element={<Products />} />
          <Route element={<ProductListTable />} path="list" />
          <Route path="view/:productId" element={<ProductsView />} />
          <Route path="edit/:productId" element={<ProductsEdit />} />
          <Route path="create" element={<CreateProduct />} />
        </Route>
        <Route path="orders">
          <Route index element={<OrdersListTable />} />
          <Route path=":orderId" element={<OrdersEdit />} />
        </Route>
        <Route path="invoices">
          <Route index element={<Invoices />} />
          <Route path="create" element={<InvoicesCreate />} />
          <Route path=":invoiceId" element={<InvoicesView />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
