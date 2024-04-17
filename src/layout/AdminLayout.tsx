import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import Loader from "../components/Loader/Loader";
import ContentLayout from "./ContentLayout";
import { BsBasket2 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";

const AdminLayout = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // fetch("https://randomuser.me/api")
    //   .then((res) => res.json())
    //   .then(() => {
    setIsAuth(true);
    setLoading(false);
    // });
  }, []);
  if (loading) {
    return <Loader />;
  }
  return isAuth ? (
    <div className="flex">
      <ContentLayout
        items={[
          {
            path: "products",
            icon: <BsBasket2 size={25} />,
            text: "Mahsulotlar",
          },
          {
            path: "meats",
            icon: <IoFastFoodOutline size={25} />,
            text: "Taomlar",
          },
          { path: "staffs", icon: <FaUsers size={25} />, text: "Xodimlar" },
        ]}
      />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

export default AdminLayout;
