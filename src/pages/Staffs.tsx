import { useState } from "react";
import StaffsTable from "../components/StaffsTable";
import { BiPlus } from "react-icons/bi";
import AddStaff from "../components/AddStaff";

const Staffs = () => {
  const [addStaffModal, setAddStaffModal] = useState(false);

  return (
    <div className="p-10 w-full">
      <div className="shadow-md backdrop-blur-sm shadow-slate-100 h-24 flex items-center rounded-3xl px-10 justify-between">
        <h1 className="text-4xl font-semibold">Xodimlar</h1>
        <button
          onClick={() => {
            setAddStaffModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white rounded-xl p-1 w-48 justify-center"
        >
          Xodim qo'shish <BiPlus />
        </button>
      </div>
      <AddStaff isOpen={addStaffModal} setIsOpen={setAddStaffModal} />

      <StaffsTable />
    </div>
  );
};

export default Staffs;
