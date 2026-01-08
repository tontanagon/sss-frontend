"use client";

import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuQuery() {
  const [items, setItems] = useState("");
  useEffect(() => {
    const getItem = async () => {
      const res = await fetch("/medadm/api/user-manager/role/get");
      
      const data = await res.json();
      setItems(data)
    };
    getItem()
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <p className="text-[#1E1E1E] text-base font-bold">
          ทั้งหมด {items.length} สิทธิ์
        </p>
        <Link
          href="roles/create"
          className="text-white text-sm font-medium bg-[#6DBD70] hover:bg-[#5b9c5dff] p-[10px_20px] rounded-[10px]"
        >
          + เพิ่มสิทธิ์
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white ">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
          />

          <input
            type="text"
            id="default-search"
            className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500 py-3"
            placeholder="ค้นหา"
            aria-label="ค้นหา"
          />
        </div>
      </div>
    </div>
  );
}
