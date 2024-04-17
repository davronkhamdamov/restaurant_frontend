import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MeatsToOrder from "../pages/MeatsToOrder";
import Orders from "../pages/Orders";
import Staffs from "../pages/Staffs";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import AdminLayout from "../layout/AdminLayout";
import StaffLayout from "../layout/StaffLayout";
import Products from "../pages/Products";
import Meat from "../pages/Meat";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="meats" index element={<Meat />} />
        <Route path="staffs" element={<Staffs />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="/staff" element={<StaffLayout />}>
        <Route path="meats" element={<MeatsToOrder />} />
        <Route path="order" element={<Orders />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default Router;
