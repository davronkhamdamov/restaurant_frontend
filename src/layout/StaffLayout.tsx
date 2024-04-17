import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import Loader from "../components/Loader/Loader";
import ContentLayout from "./ContentLayout";
import { TbClock } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";

const StaffLayout = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // fetch("https://randomuser.me/api")
    // .then((res) => res.json())
    // .then(() => {
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
            path: "meats",
            icon: <IoFastFoodOutline size={25} />,
            text: "Ovqatlar",
          },
          {
            path: "order",
            icon: <TbClock size={25} />,
            text: "Buyurtmalar",
          },
        ]}
      />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

export default StaffLayout;
