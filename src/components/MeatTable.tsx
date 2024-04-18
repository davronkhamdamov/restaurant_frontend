import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeatsType, OrdersType } from "../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import emptyImg from "../assets/svg.svg";
import { FaPlus, FaMinus, FaRightToBracket } from "react-icons/fa6";
import { CurrencyFormatter } from "../utils/utils";

const MeatTable = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [meats, setMeats] = useState<MeatsType[]>([]);
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/meat", {
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
          setMeats(data.result);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const OrderMeat = () => {
    console.log(orders);
    fetch(import.meta.env.VITE_APP_URL + "/order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          console.log(data);
        }
      });
  };
  return (
    <div className="pt-10 flex">
      <div className="flex flex-wrap gap-6 w-[80%]">
        {meats?.map((el) => {
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
                <p>{el.name}</p>
                {!orders?.some(
                  (e: any) => e.meat_id == el.id && e.count >= 1
                ) ? (
                  <div key={el.id} className="flex justify-around mt-3">
                    <button
                      className="w-full h-10 bg-slate-700 rounded-xl text-white duration-200"
                      onClick={() => {
                        setOrders((prev: any) => [
                          ...prev,
                          { meat_id: el.id, price: el.price, count: 1 },
                        ]);
                      }}
                    >
                      Qo'shish
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-around gap-10 mt-3 bg-gray-100 items-center rounded-2xl h-10 duration-200">
                    <button
                      className="w-10 flex items-center justify-center"
                      onClick={() => {
                        const result = orders
                          .map((e: any) => {
                            return e.meat_id == el.id
                              ? { ...e, count: (e.count -= 1) }
                              : { ...e };
                          })
                          .filter((e: any) => e.count > 0);
                        setOrders(result);
                      }}
                    >
                      <FaMinus />
                    </button>
                    <p>{orders?.find((e) => e.meat_id == el.id)?.count}</p>
                    <button
                      className="w-10 flex items-center justify-center"
                      onClick={() => {
                        setOrders(
                          orders.map((e: any) => {
                            return e.meat_id == el.id
                              ? { ...e, count: (e.count += 1) }
                              : { ...e };
                          })
                        );
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[20%] shadow-xl p-5 rounded-lg h-full fixed right-10 top-40">
        <div className="relative h-full">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">Savat</p>
            {orders[0] && (
              <button className="hover:bg-gray-100 h-7 rounded-lg w-20">
                Tozalash
              </button>
            )}
          </div>
          {!orders[0] ? (
            <div className="w-full h-dvh flex flex-col justify-center items-center gap-5 pb-60">
              <img src={emptyImg} alt="" width={100} />
              <p className="text-2xl font-semibold text-center">
                Hozircha savatingiz boʻsh
              </p>
            </div>
          ) : (
            orders.map((e: OrdersType) => {
              const foundMeat = meats.find((meat) => meat.id === e.meat_id);
              return (
                <div
                  className="mt-5 flex items-center justify-between"
                  key={e.meat_id}
                >
                  <LazyLoadImage
                    effect="blur"
                    width={100}
                    src={foundMeat?.img_url}
                    className="f-full object-contain rounded-xl"
                  />
                  <div>
                    <p>{foundMeat?.name}</p>
                    <p>{CurrencyFormatter(foundMeat?.price)}</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl flex justify-center gap-1 mt-3 items-center">
                    <button
                      className="text-2xl w-10"
                      onClick={() => {
                        const result = orders
                          .map((el: any) => {
                            return e.meat_id == el.meat_id
                              ? { ...el, count: (e.count -= 1) }
                              : { ...el };
                          })
                          .filter((e: any) => e.count > 0);
                        setOrders(result);
                      }}
                    >
                      -
                    </button>
                    <p>{e.count}</p>
                    <button
                      className="w-10"
                      onClick={() => {
                        setOrders(
                          orders.map((el: any) => {
                            return e.meat_id == el.meat_id
                              ? { ...el, count: (e.count += 1) }
                              : { ...el };
                          })
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
          <br />
          <hr />
          {orders[0] && (
            <div className="absolute bottom-44 w-full">
              <button
                className="bg-green-600 text-white rounded-xl w-full h-14 flex items-center justify-around"
                onClick={() => {
                  OrderMeat();
                }}
              >
                <p>Buyurma qilish</p>
                <p>
                  {CurrencyFormatter(
                    orders.reduce((a, e) => a + e.count * e.price, 0)
                  )}
                </p>
                <FaRightToBracket />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeatTable;
