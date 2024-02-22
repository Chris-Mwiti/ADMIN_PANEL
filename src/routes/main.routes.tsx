import App from "@/App"
import MainLayout from "@/Layouts/MainLayout"
import CreateProduct from "@/pages/Products/components/CreateProduct"
import ProductListTable from "@/pages/Products/tables/table"
import { Route, Routes } from "react-router"

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<App/>} />
            <Route path="products">
              <Route index element={<ProductListTable />} />
              <Route element={<ProductListTable />} path="list" />
              <Route path="edit/:id" />
              <Route path="create" element={<CreateProduct />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default MainRoutes