import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { AddModalProps } from "../types/types";
import { useNavigate } from "react-router-dom";

const AddStaff: FC<AddModalProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("auth");
  const Submit = (e: any) => {
    const { name, surname, login, password, role } = e.target;
    e.preventDefault();
    fetch(import.meta.env.VITE_APP_URL + "/staff", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        login: login.value,
        password: password.value,
        role: role.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "ok") {
          setIsOpen(false);
        }
        if (data?.detail == "Invalid token") {
          navigate("/auth/login");
        }
      });
  };
  return (
    <div>
      <div
        className={`w-96 bg-slate-200 shadow-md fixed h-dvh z-10 p-5 ${
          isOpen
            ? "right-0 top-0 duration-300"
            : "duration-1000 right-[-100%] top-0"
        }`}
      >
        <div className="flex gap-5">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <IoClose size={20} />
          </button>
          <p className="text-xl font-semibold">Yangi xodim qo'shish</p>
        </div>
        <form onSubmit={Submit} className="flex flex-col gap-5 mt-10">
          <input
            required
            minLength={4}
            type="text"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Xodim ismini kiriting"
            name="name"
          />
          <input
            required
            minLength={4}
            type="text"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Xodim familyasini kiriting"
            name="surname"
          />
          <input
            required
            minLength={4}
            type="text"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Xodimning loginini kiriting"
            name="login"
          />
          <input
            required
            minLength={4}
            type="password"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Xodimning parolini kiriting"
            name="password"
          />
          <select
            name="role"
            required
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
          >
            <option value="staff">Xodim</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex flex-col gap-3">
            <button className="bg-blue-500 text-white h-8 rounded-md">
              Yaratish
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
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
          setIsOpen(false);
        }}
        className={
          isOpen
            ? "w-full fixed h-dvh top-0 left-0 backdrop-blur-sm duration-300 bg-[rgba(0,0,0,0.5)]"
            : "duration-1000"
        }
      ></div>
    </div>
  );
};

export default AddStaff;
