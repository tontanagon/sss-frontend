"use client";

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { dropdowns } from "@/constants/dropdown-header";
import Link from "next/link";
import React from "react";

export default function LoginDropDown() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    if (session?.user) {
      await signOut({ callbackUrl: "/" });
      await fetch("/api/logout");
    }
  };

  return (
    <Menu>
      <MenuButton className="py-1 px-[10px] rounded-sm
        focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white 
        data-hover:bg-gray-100
        data-open:bg-gray-100
        md:border-0 cursor-pointer">
        <FontAwesomeIcon icon={faCircleUser} className="text-[#0055CA]" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 !max-h-100 z-50 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 shadow-lg flex flex-col"
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
            className="group flex text-[#DD0000] w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer "
          >
            ออกจากระบบ
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
