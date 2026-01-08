"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { redirect, RedirectType } from "next/navigation";
import { useSession } from "next-auth/react";
interface CartItem {
  id: number;
  name: string;
  code: string;
  type: string;
  category: string;
  image?: string;
  unit?: string;
  stock: number;
  quantity: number;
}

export default function OneItemList({
  data,
  cart,
  onConfirm,
}: {
  data: any;
  cart?: any;
  onConfirm: any;
}) {
  const { data: session, status } = useSession();
  const cart_this_item = cart?.find((item: any) => item.id === data.id);

  const [item, setItem] = useState<CartItem>();
  useEffect(() => {
    setItem({
      id: data.id,
      name: data.name,
      code: data.code,
      type: data.type,
      category: data.category,
      unit: data?.unit,
      image: data?.image,
      stock: data.stock,
      quantity: 1,
    });
  }, [data]);

  const onAddItem = async () => {
    if (!session?.user) {
      redirect("/login", RedirectType.push);
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_items: item }),
    });

    const data = await res.json();
    onConfirm(data);
  };

  const PlusItem = () => {
    setItem((prev) => (prev ? { ...prev, quantity: prev.quantity + 1 } : prev));
  };

  const MinusItem = () => {
    setItem((prev) =>
      prev ? { ...prev, quantity: Math.max(1, prev.quantity - 1) } : prev
    );
  };

  return (
    <>
      {item && (
        <div className="flex flex-col border border-[#E0E0E0] rounded-[10px] w-full">
          <div className="flex justify-between items-center p-3 text-xs">
            <div className="text-[#606060] text-[1em] font-normal ">
              รหัส {data.code}
            </div>
            <div
              className={`text-white text-[1em] font-medium sm:p-[2px_15px] p-[2px_10px] rounded-[20px] ${
                data.type === "ยืมคืน" ? "bg-[#3FB0D9]" : "bg-[#D97C3F]"
              } `}
            >
              {data.type}
            </div>
          </div>
          {/* <div className="relative self-center my-5 sm:w-[150px] sm:h-[150px] w-[85px] h-[85px]">
            <Image
              src={data.image || '/images/no-picture.png'}
              alt="image"
              fill
              className="object-contain"
            />
          </div> */}
          <img
            src={data.image ? `${data.image}` : "/images/no-picture.png"}
            alt="image"
            className="w-full aspect-square object-cover"
          />
          <div className="flex flex-col p-3 text-xs">
            <div className="sm:text-base text-[1.2em] font-semibold ">
              {data.name}
            </div>
            <div className="text-[#606060] text-[1em] font-normal">
              หมวดหมู่ :
              {Array.isArray(data.category)
                ? data.category.join(", ")
                : data.category}
            </div>
            <div className="text-[#606060] text-[1em] font-normal">
              คลัง : {data.stock} {data.unit || "หน่วย"}
            </div>
          </div>
          {item?.quantity >= data?.stock + 1 ||
          (cart_this_item &&
            cart_this_item?.quantity + item?.quantity >= data?.stock + 1) ? (
            <div className="sm:text-[1em] text-[0.8em] text-red-400 mx-3">
              จำนวนวัสดุ-อุปกรณ์ในคลังไม่เพียงพอ
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between mt-auto p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={MinusItem}
                className={`border border-[#0054ca82] text-[#0055CA] rounded-[3px] px-1 sm:px-[5px] ${
                  item?.quantity == 1
                    ? "opacity-50"
                    : "cursor-pointer hover:bg-blue-800 hover:text-white"
                }`}
                disabled={item?.quantity == 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <div className="sm:text-sm text-[10px] text-center w-[15px] font-medium">
                {item?.quantity}
              </div>
              <button
                onClick={PlusItem}
                className={`border border-[#0054ca82] text-[#0055CA] rounded-[3px] px-1 sm:px-[5px] ${
                  item?.quantity >= data?.stock ||
                  (cart_this_item &&
                    cart_this_item?.quantity + item?.quantity >=
                      cart_this_item?.stock)
                    ? "opacity-50"
                    : "cursor-pointer hover:bg-blue-800 hover:text-white"
                }`}
                disabled={
                  item?.quantity >= data?.stock ||
                  (cart_this_item &&
                    cart_this_item?.quantity + item?.quantity >=
                      cart_this_item?.stock)
                }
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <button
              onClick={onAddItem}
              className={`bg-[#0055CA] text-white text-[12px] rounded-[10px] sm:p-[1px_27px] p-[0px_15px] ${
                item?.quantity >= data.stock + 1 ||
                (cart_this_item &&
                  cart_this_item?.quantity + item?.quantity >= data?.stock + 1)
                  ? "opacity-50"
                  : "cursor-pointer hover:bg-blue-800 hover:text-white"
              }`}
              disabled={
                item?.quantity >= data?.stock + 1 ||
                (cart_this_item &&
                  cart_this_item?.quantity + item?.quantity >= data?.stock + 1)
              }
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
