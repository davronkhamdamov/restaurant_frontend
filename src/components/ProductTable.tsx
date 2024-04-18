import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../types/types";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AddWeight from "./AddWeightModal";
import { notify } from "../utils/utils";

const ProductTable = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [isOpenEditWeightModal, setIsOpenEditWeightModal] =
    useState<boolean>(false);
  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_URL + "/product", {
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
          setProducts(data.result);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteProduct = (product_id: string) => {
    fetch(import.meta.env.VITE_APP_URL + "/product/" + product_id, {
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
          notify("Muvaffaqiyat o'chirildi", "success");
          fetchData();
        }
      });
  };
  return (
    <div className="pt-10">
      <div className="flex flex-wrap gap-5">
        {products.map((e) => {
          return (
            <div
              key={e.id}
              className="flex flex-col justify-between w-[15%] min-h-64 shadow-md rounded-xl hover:scale-[1.03] hover:-translate-y-1 duration-200 min-w-44 overflow-hidden"
            >
              <div className="w-full min-h-24 h-52 flex items-center justify-center overflow-hidden">
                <LazyLoadImage
                  effect="blur"
                  src={e.img_url}
                  width={"100%"}
                  className="object-cover rounded-xl"
                />
              </div>
              <div>
                <div className="text-center mb-2">
                  <p>{e.name}</p>
                  <p className="text-sm">
                    {e.weight} {e.weight_type}
                  </p>
                </div>
                <div className="border-t-2 border-[#CBD5E145] flex h-10 items-center justify-evenly">
                  <button>
                    <MdEdit color="dodgerblue" />
                  </button>
                  <div className="bg-[#CBD5E145] w-[2px] h-full"></div>
                  <button
                    onClick={() => {
                      setProductId(e.id);
                      setIsOpenEditWeightModal(true);
                    }}
                  >
                    <BiPlus color="green" />
                  </button>
                  <div className="bg-[#CBD5E145] w-[2px] h-full"></div>
                  <button onClick={() => deleteProduct(e.id)}>
                    <MdDelete color="red" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AddWeight
        id={productId}
        isOpen={isOpenEditWeightModal}
        setData={setIsOpenEditWeightModal}
      />
    </div>
  );
};

export default ProductTable;
