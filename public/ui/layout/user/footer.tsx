"use client";
import Image from "next/image";
import { ibmPlexSansThai, inTer } from "@/constants/font";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "@/store/cartStore";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import FooterMobileDropdown from "../inc/footer-mobile-dropdown";
import {
  bell,
  bell_active,
  cart,
  cart_active,
  house,
  house_active,
  newspaper_clipping,
  newspaper_clipping_active,
} from "@/constants/asset-path";
import { usePathname } from "next/navigation";
import { useNotification } from "@/actions/NotificationContext";

export default function Footer() {
  const { cart_count, cart_count_list } = useCartStore();
  const pathname = usePathname();
  const { noti } = useNotification();

  return (
    <>
      <footer className="max-w-screen mx-auto md:block hidden ">
        <div className="flex flex-row justify-between bg-[#1D3557] lg:p-[57px_57px_57px_107px] p-[57px_10px_57px_30px] border-b border-white">
          <div className="flex items-center lg:gap-7 gap-3 space-x-3 rtl:space-x-reverse">
            <div className="relative w-[80px] h-[80px]">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <span className="flex self-center font-bold whitespace-nowrap lg:text-2xl md:xl ">
                Smart Store System
              </span>
              <p className="font-normal lg:text-[14px] md:text-sm ">
                Faculty of Associated Medical Sciences
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start space-x-3 rtl:space-x-reverse text-white gap-y-4 ">
            <span className="flex gap-7 font-semibold whitespace-nowrap md:text-2xl sm:text-lg text-sm">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTiktok} />
            </span>
            <p
              className={`lg:text-[14px]/8 md:text-[14px]/6 text-[10px]/6 ${ibmPlexSansThai.className}`}
            >
              คณะเทคนิคการแพทย์ มหาวิทยาลัยเชียงใหม่
              <br />
              110 ถนนอินทวโรรส ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200
            </p>
          </div>
        </div>

        <div
          className={`flex flex-col items-center bg-[#1D3557] p-[50px] ${inTer}`}
        >
          <p className="text-white font-[300] text-sm">
            © 2025 Smart Store | All Rights Reserved
          </p>
          <p className="text-[#FFFFFF80] font-[200] text-sm">
            Design by Mining Garden{" "}
          </p>
        </div>
      </footer>

      <footer className="md:hidden block sticky bottom-0 left-0 right-0 h-16 bg-white shadow-[0_0_10px_#0000001A] z-10 ">
        <div className="flex justify-between items-center h-full px-4">
          <Link
            href="/"
            className="flex flex-col items-center text-xs text-[#0055CA]"
          >
            {pathname === "/" ? (
              <Image src={house_active} alt="icon" width={24} height={24} />
            ) : (
              <Image src={house} alt="icon" width={24} height={24} />
            )}
            <span>หน้าแรก</span>
          </Link>

          <Link
            href="/products"
            className="flex flex-col items-center text-xs text-[#0055CA]"
          >
            {pathname === "/products" ? (
              <Image
                src={newspaper_clipping_active}
                alt="icon"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={newspaper_clipping}
                alt="icon"
                width={24}
                height={24}
              />
            )}
            <span>อุปกรณ์</span>
          </Link>

          <Link
            href="/my-cart"
            className="relative flex flex-col items-center text-xs/4 text-[#0055CA]"
          >
            {pathname === "/my-cart" ? (
              <Image src={cart_active} alt="icon" width={24} height={24} />
            ) : (
              <Image src={cart} alt="icon" width={24} height={24} />
            )}
            <span>รถเข็น</span>
            <span className="sr-only">Notifications</span>
            {cart_count_list > 0 ? (
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                {cart_count_list}
              </div>
            ) : (
              ""
            )}
          </Link>

          <Link
            href="/notification"
            className="relative flex flex-col items-center text-xs/4   text-[#0055CA]"
          >
            {pathname === "/notification" ? (
              <Image src={bell_active} alt="icon" width={24} height={24} />
            ) : (
              <Image src={bell} alt="icon" width={24} height={24} />
            )}
            {noti && noti?.length > 0 ? (
              <>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 end-1 ">
                  {noti?.length > 99 ? "+99" : noti?.length}
                </div>
              </>
            ) : (
              <></>
            )}
            <span>แจ้งเตือน</span>
            {/* <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 end-1 ">
              2
            </div> */}
          </Link>

          <FooterMobileDropdown />
        </div>
      </footer>
    </>
  );
}
