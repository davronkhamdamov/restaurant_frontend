import { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AddModalProps, ProductType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { notify } from "../utils/utils";

const AddMeat: FC<AddModalProps> = ({ isOpen, setIsOpen }) => {
  const token = localStorage.getItem("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [neededProducts, setNeededProducts] = useState<any>([{}]);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_URL + "/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!neededProducts[0]?.product_id) {
          setNeededProducts([
            {
              product_id: data.result[0].product_id,
              weight_type: data.result[0].weight_type,
            },
          ]);
        }
        setProducts(data.result);
      });
  }, []);
  const Submit = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const { name, price } = e.target;

    const formData = new FormData();
    formData.append("file", e.target.image.files[0]);
    formData.append("upload_preset", "youtube");

    fetch("https://api.cloudinary.com/v1_1/didddubfm/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(import.meta.env.VITE_APP_URL + "/meat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            price: price.value,
            img_url: data.url,
            needed_products: neededProducts,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.detail == "Invalid token") {
              navigate("/auth/login");
            }
            if ((data.status = "ok")) {
              setIsOpen(false);
              notify("Muvaffaqiyat qo'shildi", "success");
              setIsLoading(false);
              e.target.reset();
            }
          });
      });
  };

  return (
    <div>
      <div
        className={`w-[500px] bg-slate-200 shadow-md fixed h-dvh z-20 p-5 overflow-y-auto ${
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
          <p className="text-xl font-semibold">Yangi taom qo'shish</p>
        </div>
        <form onSubmit={Submit} className="flex flex-col gap-5 mt-10">
          <input
            type="text"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Taom nomini kiriting"
            name="name"
            required
          />
          <input
            type="number"
            className="rounded-md pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
            placeholder="Narxini kiriting"
            name="price"
            required
          />
          <input type="file" accept="image/*" name="image" required />
          <div className="flex flex-col gap-5">
            <label className="text-xl" htmlFor="product">
              Taomni tayyorlash uchun kerakli mahsulotlar:
            </label>
            {neededProducts.map((el: any, i: number) => {
              return (
                <div
                  className="flex gap-5 justify-between items-center"
                  key={i}
                >
                  <select
                    onChange={(e) => {
                      const updatedNeededProducts = [...neededProducts];
                      updatedNeededProducts[i].product_id = e.target.value;
                      setNeededProducts(updatedNeededProducts);
                    }}
                    id="product"
                    className="rounded-md w-2/5 text-lg outline-1 outline-gray-300 border-none p-1"
                    defaultValue={el.id}
                    required
                  >
                    {products.map((e) => {
                      return (
                        <option
                          key={e.id}
                          value={e.id}
                          disabled={neededProducts.some(
                            (ele: any, idx: number) =>
                              ele.product_id === e.id && idx !== i
                          )}
                        >
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    onChange={(e) => {
                      neededProducts[i].weight = e.target.value;
                      setNeededProducts(neededProducts);
                    }}
                    step="0.01"
                    defaultValue={el.weight}
                    min={1}
                    required
                    type="number"
                    className="rounded-md w-3/4 pl-2 text-lg outline-1 outline-gray-300 border-none p-1"
                    placeholder={`Miqdorni kiriting ${
                      products.find((e) => e.id == neededProducts[i].product_id)
                        ?.weight_type
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <button
                type="button"
                className="flex w-2/4 h-8 bg-green-500 text-white items-center justify-center rounded-lg gap-5 disabled:bg-green-300"
                disabled={products.length <= neededProducts.length}
                onClick={() => {
                  if (products.length > neededProducts.length) {
                    const nextProduct = products.filter((e) => {
                      return neededProducts.every(
                        (el: any) => el.product_id !== e.id
                      );
                    });

                    setNeededProducts((prev: any) => [
                      ...prev,
                      {
                        product_id: nextProduct[0]?.id,
                        weight_type: nextProduct[0]?.weight_type,
                      },
                    ]);
                  }
                }}
              >
                Yana qo'shish
                <BiPlus />
              </button>
              <button
                type="button"
                className="flex w-2/4 h-8 bg-red-500 text-white items-center justify-center rounded-lg gap-5 disabled:bg-red-300"
                disabled={neededProducts.length <= 1}
                onClick={() => {
                  setNeededProducts((prev: any) =>
                    prev.filter(
                      (_: any, inx: number) =>
                        neededProducts.length === 1 ||
                        inx !== neededProducts.length - 1
                    )
                  );
                }}
              >
                Ayirish
                <BiMinus />
              </button>
            </div>
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
              {isLoading ? "Yaratilmoqda..." : "Yaratish"}
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
            ? "w-full fixed h-dvh top-0 left-0 backdrop-blur-sm duration-300 z-10 bg-[rgba(0,0,0,0.5)]"
            : "duration-1000"
        }
      ></div>
    </div>
  );
};

export default AddMeat;
