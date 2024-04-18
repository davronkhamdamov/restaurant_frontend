import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import Loader from "../components/Loader/Loader";
import ContentLayout from "./ContentLayout";
import { IoFastFoodOutline } from "react-icons/io5";

const MakeMeatLayout = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsAuth(true);
    setLoading(false);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return isAuth ? (
    <div className="flex">
      <ContentLayout
        items={[
          {
            path: "meat",
            icon: <IoFastFoodOutline size={25} />,
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

export default MakeMeatLayout;
