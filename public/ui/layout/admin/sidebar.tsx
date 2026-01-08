"use client";
import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sidemenus } from "@/constants/admin-side-bar";

export default function SideBar() {
  const pathname = usePathname();
  const search_path_status = useSearchParams().get("status");
  const [mount, setMount] = useState<any>(false);

  const [countStatus, setCountStatus] = useState<any>();

  useEffect(() => {
    const getCountStatus = async () => {
      const res = await fetch("/medadm/api/sidebar/count-booking-status-admin");

      if (res.ok) {
        const data = await res.json();
        setCountStatus(data);
      }
    };

    getCountStatus();

    const interval = setInterval(getCountStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const getCountStatus = async () => {
  //     const res = await fetch("/medadm/api/sidebar/count-booking-status-admin");

  //     if (res.ok) {
  //       const data = await res.json();
  //       setCountStatus(data);
  //     }
  //   };
  //   getCountStatus();
  // }, []);

  useEffect(() => {
    setMount(true);
  }, []);

  const is_active =
    "bg-gray-200 pointer-events-none transition duration-300 ease";
  // "bg-[#0055CAE3] text-white pointer-events-none transition duration-300 ease";

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div
        className={
          collapsed ? "" : "fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
        }
        onClick={() => setCollapsed(true)}
      />
      {mount && (
        <aside
          className={`
            fixed top-0 left-0 h-full z-50 print:hidden border-r border-[#F5F5F5]
            duration-300 ease-in-out 
            
            w-72

            /* จอใหญ่ (desktop) */
            lg:relative lg:translate-x-0

            /* toggle */
            ${collapsed ? "-translate-x-full lg:w-0 " : "translate-x-0 lg:w-72 "}
          `}
        >
          <div
            className={`h-full overflow-y-auto bg-white transition-opacity duration-300 ease-in-out px-3 py-4 
              ${collapsed ? "lg:opacity-0 lg:hidden" : "lg:opacity-100 lg:block"}
            `}
          >
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-3 rtl:space-x-reverse mb-5"
                >
                  <div className="relative md:w-[50px] md:h-[50px] w-[35px] h-[35px]">
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-[#264981]">
                    <span className="flex gap-1 self-center font-semibold whitespace-nowrap text-md">
                      Smart Store<p className="text-[#9D76B3]">System</p>
                    </span>
                  </div>
                </Link>
              </li>
              {sidemenus.map((sidemenu, index) => (
                <li key={index} className="border-b border-[#F5F5F5] pb-3">
                  <div className="px-2 py-1 text-gray-500 uppercase text-sm">
                    {sidemenu.title}
                  </div>
                  <ul className="space-y-1">
                    {sidemenu.menu.map((menu_item, index) => (
                      <li key={index}>
                        <Link
                          href={{
                            pathname: menu_item.link,
                            ...(menu_item?.status
                              ? { query: { status: menu_item.status } }
                              : {}),
                          }}
                          className={`flex justify-between items-center p-2 text-lg text-gray-700 rounded-lg group link ${
                            pathname.endsWith(menu_item.link) &&
                            (menu_item.status === undefined ||
                              search_path_status === menu_item?.status)
                              ? is_active
                              : ""
                          }`}
                          onNavigate={(e) => {
                            
                          }}
                        >
                          <span className="ms-3">
                            <FontAwesomeIcon
                              icon={menu_item.icon}
                              className={menu_item.styleIcon}
                            />
                            {menu_item.name}
                          </span>
                          {menu_item.status &&
                          countStatus &&
                          countStatus[menu_item.status]?.count > 0 ? (
                            <span className="text-sm text-white text-center leading-[10px] bg-red-500 p-[4px_6px] mr-2 rounded">
                              {countStatus[menu_item.status].count}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="absolute top-3 -right-15 flex items-center justify-center text-2xl w-12 h-12 bg-white text-gray-500 rounded-full lg:border-0 border border-gray-300 hover:bg-gray-100 cursor-pointer focus:outline-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </aside>
      )}
    </>
  );
}
