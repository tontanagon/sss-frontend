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
          href="tags/create"
          className="text-white text-sm font-medium bg-[#f20d6cff] hover:bg-[#c20c58ff] p-[10px_20px] rounded-[10px]"
        >
          + เพิ่ม tag
        </Link>
      </div>

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
