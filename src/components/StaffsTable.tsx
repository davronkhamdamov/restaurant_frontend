import { useEffect, useState } from "react";
import { StaffsType } from "../types/types";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StaffsTable = () => {
  const [staffs, setStaffs] = useState<StaffsType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const token = localStorage.getItem("auth");
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/staff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail) {
          navigate("/auth/login");
        }
        if ((data.status = "ok")) {
          setStaffs(data.result);
        }
      });
  };

  const deleteStaff = (staff_id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/staff/" + staff_id, {
      method: "DELETE",
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
          fetchData();
        }
      });
  };
  return (
    <div className="pt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-1/6 border-2 border-gray-100 p-2 text-start">
              Ism
            </th>
            <th className="w-1/6 border-2 border-gray-100 p-2 text-start">
              Familya
            </th>
            <th className="w-1/6 border-2 border-gray-100 p-2 text-start">
              Login
            </th>
            <th className="w-1/6 border-2 border-gray-100 p-2 text-start">
              Role
            </th>
            <th className="w-1/12 border-2 border-gray-100 p-2 text-start">
              Bajariladigan ishlar
            </th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((e) => {
            return (
              <tr key={e.id}>
                <td className="border-2 border-gray-100 p-2">{e.name}</td>
                <td className="border-2 border-gray-100 p-2">{e.surname}</td>
                <td className="border-2 border-gray-100 p-2">{e.login}</td>
                <td className="border-2 border-gray-100 p-2">{e.role}</td>
                <td className="border-2 border-gray-100 p-2">
                  <button className="w-10 ml-5">
                    <MdModeEdit size={20} className="hover:text-gray-600" />
                  </button>
                  <button className="w-10" onClick={() => deleteStaff(e.id)}>
                    <MdDelete size={20} color="rgb(255, 0, 0)" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StaffsTable;
