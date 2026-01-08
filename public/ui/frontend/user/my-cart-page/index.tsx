"use client";
import { useCartStore } from "@/store/cartStore";
import ModalForm from "@/ui/frontend/user/my-cart-page/inc/modal-form-submit";
import { TableList } from "@/ui/frontend/user/my-cart-page/table-list";
import Link from "next/link";

export default function MyCartPage() {
  const { cart_count, cart_count_list } = useCartStore();
  return (
    <>
      <TableList />
      <div className="flex justify-between items-center sm:pt-[20px] sm:pb-[40px]">
        <div className="md:flex md:gap-2 md:items-center text-normal sm:text-xl text-md ">
          รวมทั้งหมด {cart_count_list} รายการ {cart_count} ชิ้น{" "}
          {cart_count >= 200 ? (
            <div className="text-[#DD0000] text-sm">
              จำนวนวัสดุ-อุปกรณ์ที่ยืมได้สูงสุด 200 ชิ้นต่อ 1 การจอง
            </div>
          ) : (
            ""
          )}
        </div>
        <ModalForm />
      </div>
    </>
  );
}
