"use client";
import { useNotification } from "@/actions/NotificationContext";
import { dotx4, dotx4_active } from "@/constants/asset-path";
import { dropdowns } from "@/constants/dropdown-header";
import { faCircleUser, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import React from "react";

export default function FooterMobileDropdown() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const handleLogout = async () => {
    if (session?.user) {
      await fetch("/api/logout");
      await signOut({ callbackUrl: "/" });
    }
  };
  return (
    <Menu>
      {session?.user ? (
        <MenuButton
          className="py-1 px-[10px] rounded-sm
        focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white 
        data-hover:bg-gray-100
        data-open:bg-gray-100
        md:border-0 cursor-pointer
        flex flex-col items-center text-xs text-[#0055CA]
        "
          // disabled={status === "unauthenticated"}
          // onClick={() => {status === "unauthenticated" && router.push('/login')}}
        >
          {pathname === "/personal-information" ||
          pathname === "/booking-history" ? (
            <Image src={dotx4_active} alt="icon" width={24} height={24} />
          ) : (
            <Image src={dotx4} alt="icon" width={24} height={24} />
          )}
          <span>อื่น ๆ</span>
        </MenuButton>
      ) : (
        <Link
          href="/login"
          className="py-1 px-[10px] rounded-sm
        focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white 
        data-hover:bg-gray-100
        data-open:bg-gray-100
        md:border-0 cursor-pointer
        flex flex-col items-center text-xs text-[#0055CA]
        "
          // disabled={status === "unauthenticated"}
          // onClick={() => {status === "unauthenticated" && router.push('/login')}}
        >
          <Image src={dotx4} alt="icon" width={24} height={24} />
          <span>อื่น ๆ</span>
        </Link>
      )}

      <MenuItems
        transition
        anchor="top start"
        className="w-52 !max-h-100 z-90 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(4)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 shadow-lg flex flex-col"
      >
        {dropdowns?.map((dropdown, index) =>
          !dropdown.permission ||
          session?.user?.role?.includes(dropdown.permission) ? (
            <React.Fragment key={index}>
              {dropdown.links.map((dropdown_link, linkIndex) => (
                <MenuItem key={linkIndex}>
                  <Link
                    href={dropdown_link.link}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer"
                  >
                    {dropdown_link.label}
                  </Link>
                </MenuItem>
              ))}
              <div className="my-1 h-px bg-gray-200" />
            </React.Fragment>
          ) : null
        )}
        <MenuItem>
          <button
            onClick={handleLogout}
            className="group flex w-full text-[#DD0000] items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer "
          >
            ออกจากระบบ
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
