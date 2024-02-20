import App from "@/App"
import MainLayout from "@/Layouts/MainLayout"
import CreateProduct from "@/pages/Products/components/CreateProduct"
import { Route, Routes } from "react-router"

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<App/>} />
            <Route path="products/create" element={<CreateProduct />} />
        </Route>
    </Routes>
  )
}

export default MainRoutes