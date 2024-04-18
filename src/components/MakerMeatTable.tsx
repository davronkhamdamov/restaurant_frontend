import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersType } from "../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CurrencyFormatter, notify } from "../utils/utils";
import { GrPowerCycle } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import dayjs from "dayjs";

const status = {
  Kutilmoqda: {
    text: "Kutilmoqda",
    icon: <CiClock1 />,
  },
  Tayyorlanmoqda: {
    text: "Tayyorlanmoqda",
    icon: <GrPowerCycle className="animate-spin" />,
  },
  Tayyor: {
    text: <p className="text-green-600">Tayyor</p>,
    icon: <MdDone color="green" />,
  },
};

const MakerMeatTable = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/order/make", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          setOrders(data.result);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const UpdateOrder = (order_id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/order/" + order_id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status:
          orders.find((e) => e.id === order_id)?.status === "Kutilmoqda"
            ? "Tayyorlanmoqda"
            : "Tayyor",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          fetchData();
          notify("Buyurtma yangilandi", "success");
        }
      });
  };
  return (
    <div className="pt-10 flex">
      <div className="flex flex-wrap gap-6 w-full">
        {orders?.map((el) => {
          return (
            <div
              key={el.id}
              className="flex flex-col justify-between w-[20%] min-h-52 shadow-md p-4 rounded-xl hover:scale-[1.03] hover:-translate-y-1 duration-200 min-w-52"
            >
              <div className="w-full h-52 flex items-center overflow-hidden justify-center p-2">
                <LazyLoadImage
                  effect="blur"
                  src={el.img_url}
                  className="w-full object-cover rounded-xl"
                />
              </div>
              <div className="text-center mt-5">
                <p className="text-3xl font-medium">
                  {CurrencyFormatter(el.price)}
                </p>
                <p>{el.count + " ta " + el.name}</p>
                <div className="flex justify-center items-center gap-2">
                  {status[el.status]?.text}
                  {status[el.status]?.icon}
                </div>
                <div className="mt-1">
                  <p>
                    Buyurtma qilingan vaqt:{" "}
                    {dayjs(el.created_at).format("HH:MM")}
                  </p>
                  <p>
                    Yangilangan vaqt:{" "}
                    {el.updated_at
                      ? dayjs(el.updated_at).format("HH:MM")
                      : "-:-"}
                  </p>
                </div>
                <div key={el.id} className="flex justify-around mt-3">
                  <button
                    className="w-full h-10 bg-slate-900 rounded-xl text-white duration-200 disabled:bg-slate-400"
                    disabled={el.status === "Tayyor"}
                    onClick={() => UpdateOrder(el.id)}
                  >
                    Buyurtmani
                    {el.status === "Kutilmoqda" ? " tayyorlash" : " tugatish"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MakerMeatTable;
