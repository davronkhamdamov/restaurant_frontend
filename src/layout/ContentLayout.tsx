import { Link, useLocation } from "react-router-dom";
import { ContentLayoutProps } from "../types/types";
import { FC } from "react";
import { ImExit } from "react-icons/im";

const ContentLayout: FC<{ items: ContentLayoutProps[] }> = ({ items }) => {
  const { pathname } = useLocation();

  return (
    <div className="w-80 pr-52">
      <div className="w-72 bg-slate-100 shadow-xl h-dvh p-8 flex flex-col gap-4 pt-20 fixed">
        {items.map((e: ContentLayoutProps, i: number) => {
          return (
            <Link
              to={e.path}
              key={i}
              className={`flex justify-between h-10 items-center px-5 hover:bg-blue-500 hover:text-white duration-200 rounded-2xl ${
                pathname.split("/")[2] == e.path
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              {e.text}
              {e.icon}
            </Link>
          );
        })}
        <Link
          onClick={() => {
            localStorage.removeItem("auth");
          }}
          to={"/auth/login"}
          className="flex justify-between h-10 items-center px-5 hover:bg-blue-500 hover:text-white duration-200 rounded-2xl  bg-slate-200 text-black"
        >
          Chiqish
          <ImExit />
        </Link>
      </div>
    </div>
  );
};

export default ContentLayout;
