import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersType } from "../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CurrencyFormatter } from "../utils/utils";

const OrderStatusTable = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/order", {
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
        status: "Tugatildi",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          fetchData();
        }
      });
  };
  return (
    <div className="pt-10 flex">
      <div className="flex flex-wrap gap-6 w-[80%]">
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
                <p>{el.status}</p>
                <div key={el.id} className="flex justify-around mt-3">
                  <button
                    className="w-full h-10 bg-slate-900 rounded-xl text-white duration-200 disabled:bg-slate-400"
                    disabled={el.status !== "Tayyor"}
                    onClick={() => UpdateOrder(el.id)}
                  >
                    Buyurtmani olish
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

export default OrderStatusTable;
