import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { EditModalType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/utils";

const AddWeight: FC<EditModalType> = ({ id, isOpen, setData }) => {
  const token = localStorage.getItem("auth");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const Submit = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const { weight } = e.target;

    fetch(import.meta.env.VITE_APP_URL + "/product/weight/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        weight: weight.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          setData(false);
          notify("Muvaffaqiyat qo'shildi", "success");
          e.target.reset();
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div
        className={`w-96 bg-slate-200 shadow-md fixed h-dvh z-20 p-5 ${
          isOpen
            ? "right-0 top-0 duration-300"
            : "duration-1000 right-[-100%] top-0"
        }`}
      >
        <div className="flex gap-5">
          <button
            onClick={() => {
              setData(false);
            }}
          >
            <IoClose size={20} />
          </button>
          <p className="text-xl font-semibold">Mahsulotga qo'shish</p>
        </div>
        <form onSubmit={Submit} className="flex flex-col gap-5 mt-10">
          <input
            min={1}
            type="number"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Mahsulotni qanchalini kirting: (kg)"
            name="weight"
          />
          <div className="flex flex-col gap-3">
            <button
              className="bg-blue-500 text-white h-8 rounded-md disabled:bg-slate-400 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Qo'shilmoqda..." : "Qo'shish"}
            </button>
            <button
              type="button"
              onClick={() => {
                setData(false);
              }}
              className="bg-red-500 text-white h-8 rounded-md"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={() => {
          setData(false);
        }}
        className={
          isOpen
            ? "w-full fixed h-dvh top-0 left-0 backdrop-blur-sm duration-300 z-10 bg-[rgba(0,0,0,0.5)]"
            : "duration-1000"
        }
      ></div>
    </div>
  );
};

export default AddWeight;
