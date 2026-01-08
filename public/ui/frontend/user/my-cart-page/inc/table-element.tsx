"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
interface CartItem {
  id: number;
  name: string;
  code: string;
  type: string;
  category: string;
  image?: string;
  stock: number;
  unit: string;
  quantity: number;
}
export default function TableElement({
  data,
  reload,
}: {
  data: CartItem;
  reload: () => void;
}) {
  const { setCartCount, cart_count } = useCartStore();
  const x = useMotionValue(0);
  // const [items, setItem] = useState(data);
  const [quantity, setQuantity] = useState(1);
  const debounceTimer = useRef<any>(null);

  const PlusItem = () => {
    if (data.stock > quantity) {
      let newQuantity = 0;
      setQuantity((prev) => {
        newQuantity = prev + 1;
        return newQuantity;
      });

      setCartCount(cart_count + 1);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        const res = await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_items: {
              id: data.id,
              quantity: newQuantity,
            },
          }),
        });
      }, 700);
    }
  };

  const MinusItem = () => {
    if (quantity > 1) {
      let newQuantity = 0;
      setQuantity((prev) => {
        newQuantity = prev - 1;
        return newQuantity;
      });

      setCartCount(cart_count - 1);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        const res = await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_items: {
              id: data.id,
              quantity: newQuantity,
            },
          }),
        });
      }, 700);
    }
  };

  const RemoveItem = async () => {
    if (data.quantity > 0) {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_items: {
            id: data.id,
            quantity: 0,
          },
        }),
      });
      if (res.ok) {
        reload();
      }
    }
  };

  useEffect(() => {
    setQuantity(data?.quantity);
  }, [data]);

  return (
    <>
      {/* mobile */}
      <tr className="relative lg:hidden">
        <td colSpan={4} className="p-0">
          <div className="relative overflow-hidden">
            {/* ปุ่มด้านหลัง */}
            <div className="absolute inset-0 flex justify-end items-center pr-4">
              <button
                onClick={() => {
                  RemoveItem();
                  x.set(0);
                }}
                className="bg-[#F20D6C14] text-[#F20D6C] p-[5px_10px] rounded-[8px] hover:bg-[#F20D6C57] focus:outline-none"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>

            {/* แถวที่ลากได้ */}
            <motion.div
              drag="x"
              style={{ x }}
              dragConstraints={{ left: -55, right: 0 }}
              onDrag={(event, info) => {
                if (info.offset.x > 0) x.set(0);
              }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -40) {
                  x.set(-80);
                } else {
                  x.set(0);
                }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 flex items-center bg-white border-b border-gray-200"
            >
              <div className="py-4 w-[85px]">
                <div className="relative w-[60px] h-[60px]">
                  <Image
                    src={data.image || "/images/no-picture.png"}
                    alt="image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="py-1 flex-1">
                <div className="text-base text-gray-900 font-medium">
                  {data.name}
                </div>
                <div className="text-[#606060] text-xs">
                  หมวดหมู่ :
                  {Array.isArray(data.category)
                    ? data.category.join(", ")
                    : data.category}
                </div>
                <div
                  className="text-[#606060] text-xs"
                >
                  หน่วย : {data.unit || 'หน่วย'}
                </div>
                <div
                  className={`text-xs ${
                    data.type === "ยืมคืน" ? "text-[#3FB0D9]" : "text-[#D97C3F]"
                  }`}
                >
                  {data.type}
                </div>
              </div>

              <div className="px-2 py-1">
                <div className="flex items-center w-fit mx-auto gap-5 sm:p-[8px_30px] p-[4px_15px] border border-[#F5F5F5] rounded-[20px]">
                  <button
                    onClick={MinusItem}
                    className="text-[10px] cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div className="text-base w-5 text-center">{quantity}</div>
                  <button
                    disabled={cart_count >= 50}
                    onClick={PlusItem}
                    className="text-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-default"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </td>
      </tr>

      {/* disktop */}
      <tr className="hidden lg:table-row bg-white border-b border-gray-200">
        <td className="py-4 w-[85px]">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={data.image || "/images/no-picture.png"}
              alt="image"
              fill
              className="object-contain"
            />
          </div>
        </td>
        <td className="pl-6 py-3 w-[85px]">
          <div className="text-base text-gray-900 font-medium whitespace-nowrap">
            {data.name}
          </div>
          <div className="text-[#606060] text-xs truncate whitespace-nowrap">
            หมวดหมู่ :
            {Array.isArray(data.category)
              ? data.category.join(", ")
              : data.category}
          </div>
        </td>

        <td
          className={`px-6 py-3 text-base ${
            data.type === "ยืมคืน" ? "text-[#3FB0D9]" : "text-[#D97C3F]"
          }`}
        >
          {data.type}
        </td>

        <td className="sm:px-6 sm:py-3 px-2 py-1">
          <div className="flex items-center w-fit mx-auto gap-5 sm:p-[8px_30px] p-[4px_15px] border border-[#F5F5F5] rounded-[20px]">
            <button onClick={MinusItem} className="text-[10px] cursor-pointer">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className="text-base w-5 text-center">{quantity}</div>
            <button
              onClick={PlusItem}
              disabled={cart_count >= 50}
              className="text-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </td>
        
        <td className="sm:px-6 sm:py-3 px-2 py-1 text-center">
          {data.unit || 'หน่วย'}
        </td>
        
        <td className="px-6 py-3 text-center">
          <button
            onClick={() => {
              RemoveItem();
            }}
            className="bg-[#F20D6C14] text-[#F20D6C] p-[5px_10px] rounded-[8px] hover:bg-[#F20D6C57] focus:outline-none cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    </>
  );
}
