"use client";
import Image from "next/image";
import { ibmPlexSansThai, inTer } from "@/constants/font";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  return (
    <>
      <footer className="max-w-screen mx-auto print:hidden">
        <div className="flex flex-row justify-between bg-[#1D3557] lg:p-[57px_57px_57px_107px] md:p-[57px_10px_57px_30px] p-[30px_10px_30px_30px] border-b border-white">
          <div className="flex items-center lg:gap-7 md:gap-3 gap-0 space-x-3 rtl:space-x-reverse">
            <div className="relative md:w-[80px] md:h-[80px] w-[50px] h-[50px]">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <span className="flex self-center font-bold whitespace-nowrap lg:text-2xl md:text-sm text-[10px]">
                Smart Store System
              </span>
              <p className="font-normal lg:text-[14px] md:text-sm text-[10px]">
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
          className={`flex flex-col items-center bg-[#1D3557] md:p-[50px] p-[30px] ${inTer}`}
        >
          <p className="text-white font-[300] md:text-sm text-[10px]">
            © 2025 Smart Store | All Rights Reserved
          </p>
          <p className="text-[#FFFFFF80] font-[200] md:text-sm text-[10px]">
            Design by Mining Garden
          </p>
        </div>
      </footer>
    </>
  );
}
