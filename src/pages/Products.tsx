import { BiPlus } from "react-icons/bi";
import ProductTable from "../components/ProductTable";
import AddProduct from "../components/AddProduct";
import { useState } from "react";
const Products = () => {
  const [addProductModal, setAddProductModal] = useState(false);
  return (
    <div className="p-10 w-full overflow-y-auto">
      <div className="shadow-md backdrop-blur-sm shadow-slate-100 h-24 flex items-center rounded-3xl px-10 justify-between">
        <h1 className="text-4xl font-semibold">Mahsulotlar</h1>
        <button
          onClick={() => {
            setAddProductModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white rounded-xl p-1 w-60 justify-center"
        >
          Yangi maxsulot qo'shish <BiPlus />
        </button>
      </div>
      <AddProduct isOpen={addProductModal} setIsOpen={setAddProductModal} />
      <ProductTable />
    </div>
  );
};

export default Products;
