"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCartShopping,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NotificationIcon from "./notification";
import LoginDropDown from "./login-dropdown";

export default function HasLogIn({ cart_count_list }: { cart_count_list: number }) {
  return (
    <div className="flex flex-row gap-5 ">
      <Link href="/my-cart" className="py-1 px-2 rounded-sm hover:bg-gray-100 ">
        <div className="relative">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="transform scale-x-[-1] text-[#0055CA]"
          />
          <span className="sr-only">cart</span>
          {cart_count_list > 0 ? (
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
              {cart_count_list}
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
      <NotificationIcon />
      <LoginDropDown />
    </div>
  );
}
