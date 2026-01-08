"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

interface MenuQueryProps {
  count_items: number | undefined;
  onSearchChange: (newSearch: string) => void;
}
export default function MenuQuery({
  count_items,
  onSearchChange,
}: MenuQueryProps) {
  const [search, setSearch] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.currentTarget.value);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <p className="text-[#1E1E1E] text-base font-bold">
          ทั้งหมด {count_items} รายการ
        </p>
        <Link
          href="/medadm/products"
          className="text-white text-sm font-medium bg-[#0B9BB5] hover:bg-[#0a7f93ff] p-[10px_20px] rounded-[10px]"
        >
          วัสดุ
        </Link>
        <Link
          href="/medadm/categories"
          className="text-white text-sm font-medium bg-[#6DBD70] hover:bg-[#5b9c5dff] p-[10px_20px] rounded-[10px]"
        >
          หมวดหมู่
        </Link>
        <Link
          href="types/create"
          className="text-white text-sm font-medium bg-[#FCB500] hover:bg-[#c28b00ff] p-[10px_20px] rounded-[10px]"
        >
          + เพิ่มประเภท
        </Link>
        <Link
          href="/medadm/tags"
          className="text-white text-sm font-medium bg-[#f20d6cff] hover:bg-[#c20c58ff] p-[10px_20px] rounded-[10px]"
        >
          tag
        </Link>
      </div>

      <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
        />

        <input
          type="text"
          id="default-search"
          className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500 py-2"
          placeholder="ค้นหา"
          aria-label="ค้นหา"
          value={search}
          onChange={(e) => {
            handleInputChange(e);
            setSearch(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
}
