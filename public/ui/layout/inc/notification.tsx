"use client";
import { useNotification } from "@/actions/NotificationContext";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'nextjs-toploader/app'; 
import { useEffect, useState } from "react";

export default function NotificationIcon() {
  const router = useRouter();
  const { noti } = useNotification();
  
  const makeAsRead = async (url: string, uuid: string) => {
    const res = await fetch(`/api/notification/make-as-read?uuid=${uuid}`);
    router.push(url);
  };

  return (
    <Menu>
      <MenuButton
        className="py-1 px-[10px] rounded-sm
        focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white 
        data-hover:bg-gray-100
        data-open:bg-gray-100
        md:border-0 cursor-pointer"
      >
        <div className="relative">
          <FontAwesomeIcon
            icon={faBell}
            className="transform scale-x-[-1] text-[#0055CA]"
          />
          {noti?.length ? (
            <>
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                {noti?.length > 99 ? "+99" : noti?.length}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-80 !max-h-80 origin-top-right rounded-xl z-10 border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 shadow-lg flex flex-col"
      >
        <div className="flex-1 overflow-y-auto">
          {noti?.length ? (
            noti?.map((item: any) => (
              <MenuItem key={item.id}>
                <button
                  type="button"
                  onClick={() => makeAsRead(item.data[0].url, item.id)}
                  className="group flex flex-col w-full gap-2 px-3 py-1.5 data-focus:bg-gray-300 border-b border-gray-300 cursor-pointer"
                >
                  <div className="text-start">
                    <div className="inline-flex items-center justify-center w-2 h-2 text-[10px] font-bold text-white bg-red-500 rounded-full mr-1"></div>
                    {item.data[0].title}
                  </div>
                  <p className="text-start">{item.data[0].message}</p>
                </button>
              </MenuItem>
            ))
          ) : (
            <div className="p-2 mt-3 flex justify-center text-gray-400 items-center">
              ไม่พบการแจ้งเตือนล่าสุด
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 text-center">
          <Link
            href="/notification"
            className="text-[#0055da] hover:text-[#002e78ff]"
          >
            ดูแจ้งเตือนทั้งหมด
          </Link>
        </div>
      </MenuItems>
    </Menu>
  );
}
