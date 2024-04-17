import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddMeat from "../components/AddMeat";
import MeatsTableForAdmin from "../components/MeatsTableForAdmin";

const Meat = () => {
  const [addMeatModal, setAddMeatModal] = useState(false);

  return (
    <div className="p-10 w-full">
      <div className="shadow-md backdrop-blur-sm shadow-slate-100 h-24 flex items-center rounded-3xl px-10 justify-between">
        <h1 className="text-4xl font-semibold">Taom</h1>
        <button
          onClick={() => {
            setAddMeatModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white rounded-xl p-1 w-48 justify-center"
        >
          Maxsulot qo'shish <BiPlus />
        </button>
      </div>
      <AddMeat isOpen={addMeatModal} setIsOpen={setAddMeatModal} />
      <MeatsTableForAdmin />
    </div>
  );
};

export default Meat;
