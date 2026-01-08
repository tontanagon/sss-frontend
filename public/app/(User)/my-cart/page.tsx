import Link from "next/link";

import { Metadata } from "next";
import { metadata as metaConstants } from "@/constants/meta";
import MyCartPage from "@/ui/frontend/user/my-cart-page";

export const metadata: Metadata = {
  title: `ตะกร้า - ${metaConstants.title}`,
};

export default function myCartPage() {
  return (
    <div className="container mx-auto min-h-screen px-4">
      <h5 className="lg:text-3xl md:text-2xl sm:text-lg text-md font-bold lg:my-10 md:my-7 my-5">
        My Cart
      </h5>
      <Link
        href="/"
        className="text-white md:text-base sm:text-sm text-xs font-bold md:p-[10px_30px] sm:p-[7px_25px] p-[5px_20px] rounded-[10px] bg-[#0055CA] hover:bg-blue-800 focus:outline-none md:focus:ring-4 focus:ring-3 focus:ring-blue-300 cursor-pointer"
      >
        เพิ่มรายการ
      </Link>
      <MyCartPage />
    </div>
  );
}
