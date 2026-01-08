"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const current_path = usePathname()
  return (
    <>
      <nav className="bg-white border-b border-[#F5F5F5] print:hidden">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 ml-15">
          {/* <Link
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
          </Link> */}

          <div className="w-auto" id="navbar-default">
          </div>

          <Link
            href="/personal-information"
            className="flex text-[#686868] text-[40px] text-center"
          >
            <FontAwesomeIcon icon={faUserCircle} />
          </Link>
        </div>
      </nav>
    </>
  );
}
