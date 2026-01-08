"use client";
import Image from "next/image";
import HasLogIn from "@/ui/layout/inc/has-login";
import HasNoLogIn from "@/ui/layout/inc/has-no-login";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
// import { auth } from "@/auth"

export default function Header() {
  const { data: session, status } = useSession();
  const { cart_count, cart_count_list } = useCartStore();
  // const session = await auth()
  return (
    <nav className="bg-white border-b border-[#F5F5F5]">
        <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="relative md:w-[70px] md:h-[70px] w-[35px] h-[35px]">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-[#264981]">
              <span className="flex gap-1 self-center font-semibold whitespace-nowrap md:text-2xl sm:text-lg text-sm ">
                Smart Store <p className="text-[#9D76B3]">System</p>
              </span>
              <p className="md:text-[14px] sm:text-md text-[10px]">
                Faculty of Associated Medical Sciences
              </p>
            </div>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium text-[20px] flex flex-row items-center p-0 rounded-lg space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0055CA] md:p-0"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0055CA] md:p-0"
                >
                  วัสดุอุปกรณ์
                </Link>
              </li>
              <li>
                {session?.user && session ? (
                  <HasLogIn cart_count_list={cart_count_list} />
                ) : (
                  <HasNoLogIn />
                )}
              </li>
            </ul>
          </div>
          <div className="block md:hidden">
            {!session?.user && <HasNoLogIn />}
          </div>
        </div>
      </nav>
  );
}
