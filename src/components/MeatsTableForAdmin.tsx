import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeatsType } from "../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdDelete, MdEdit } from "react-icons/md";
import { CurrencyFormatter } from "../utils/utils";

const MeatsTableForAdmin = () => {
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
        console.log(data);

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
  const deleteMeat = (meat_id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/meat/" + meat_id, {
      method: "DELETE",
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
          fetchData();
        }
      });
  };
  return (
    <div className="pt-10">
      <div className="flex flex-wrap gap-6">
        {meats?.map((el) => {
          return (
            <div
              key={el.id}
              className="flex flex-col justify-between w-[16%] min-w-52 min-h-80 shadow-md rounded-xl hover:scale-[1.03] hover:-translate-y-1 duration-200 overflow-hidden"
            >
              <div className="w-full h-52 flex items-center overflow-hidden justify-center p-2">
                <LazyLoadImage
                  className="w-full object-cover rounded-xl"
                  effect="blur"
                  src={el.img_url}
                />
              </div>
              <div>
                <p className="text-center">{el.name}</p>
                <p className="text-center">{CurrencyFormatter(el.price)}</p>
              </div>
              <div className="border-t-2 border-[#CBD5E145] flex h-10 items-center justify-evenly">
                <button>
                  <MdEdit color="dodgerblue" />
                </button>
                <div className="bg-[#CBD5E145] w-[2px] h-full"></div>
                <button onClick={() => deleteMeat(el.id)}>
                  <MdDelete color="red" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeatsTableForAdmin;
