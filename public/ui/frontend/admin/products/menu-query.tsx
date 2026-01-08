"use client";
import {
  faFileExcel,
  faFilter,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";

import { use, useEffect, useState } from "react";
import ExportExcel from "./inc/export-excel";
import { useRouter } from "next/navigation";

interface option {
  id: number;
  name: string;
}

interface selectoption {
  category: number[];
  type: number[];
}

export interface QueryExport {
  category: string[] | null;
  teacher: string[] | null;
  subject: string[] | null;
  fromDate: string | null;
  toDate: string | null;
}

export default function MenuQuery({
  count_items,
  setSearch,
  search,
  setSearchParams,
}: {
  count_items: number;
  setSearch: any;
  search: any;
  setSearchParams: (params_type: string, value: any) => void;
}) {
  const [optionCategory, setOptionCategory] = useState<option[]>([]);
  const [optionType, setOptionType] = useState<option[]>([]);

  // const [selectOption, setSelectOption] = useState<selectoption>({
  //   category: [],
  //   type: [],
  // });

  const toggleSelection = (
    name: "category" | "type",
    value: number,
    checked: boolean
  ) => {
    setSearch((prev: any) => {
      const updatedStatus = {
        ...prev.search_status,
        [name]: checked
          ? [...prev.search_status[name], value]
          : prev.search_status[name].filter((v: number) => v !== value),
      };
      
      setSearchParams("search_status", updatedStatus);

      return {
        ...prev,
        page: 1,
        search_status: updatedStatus,
      };
    });
  };

  const handleCategorySearchBox = (value: number, checked: boolean) => {
    toggleSelection("category", value, checked);
  };

  const handleTypeSearchBox = (value: number, checked: boolean) => {
    toggleSelection("type", value, checked);
  };

  const exportExcel = async (query: QueryExport) => {
    const res = await fetch(
      "/medadm/api/products/export-excel?category=" +
        (query.category ? query.category.join(",") : "") +
        "&teacher=" +
        (query.teacher ? query.teacher.join(",") : "") +
        "&subject=" +
        (query.subject ? query.subject.join(",") : "") +
        "&fromDate=" +
        (query.fromDate ? query.fromDate : "") +
        "&toDate=" +
        (query.toDate ? query.toDate : "")
    );

    if (res.ok) {
      const contentDisposition = res.headers.get("Content-Disposition");
      let filename = "products.xlsx";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) {
          filename = match[1];
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    // const blob = await res.blob();

    return;
  };

  useEffect(() => {
    const getOptionCategory = async () => {
      const res = await fetch("/medadm/api/products/option/category");
      const data = await res.json();
      setOptionCategory(data);
    };

    const getOptionType = async () => {
      const res = await fetch("/medadm/api/products/option/type");
      const data = await res.json();
      setOptionType(data);
    };

    getOptionCategory();
    getOptionType();
  }, []);

  return (
    <div className="flex md:flex-row md:justify-between flex-col gap-3 items-center">
      <div className="flex gap-2 items-center">
        <p className="text-[#1E1E1E] text-base font-bold">
          ทั้งหมด {count_items} รายการ
        </p>
        <Link
          href="products/create"
          onNavigate={(e) => {}}
          className="text-white text-sm font-medium bg-[#0B9BB5] hover:bg-[#0a7f93ff] p-[10px_20px] rounded-[10px]"
        >
          + เพิ่มวัสดุ
        </Link>
        <ExportExcel
          optionCategory={optionCategory}
          exportExcel={(query: QueryExport) => exportExcel(query)}
        />
      </div>

      <div className="flex gap-3">
        {search.search_text ||
        search.search_status.category.length ||
        search.search_status.type.length ? (
          <button
            className="text-[#dd0000] flex items-center gap-1 cursor-pointer"
            type="button"
            onClick={() => {
              setSearch({
                ...search,
                page: 1,
                search_text: "",
                search_status: { category: [], type: [] },
              });
              setSearchParams("all", null);
            }}
          >
            <FontAwesomeIcon icon={faXmark} /> ล้างตัวกรอง
          </button>
        ) : (
          <></>
        )}

        <Popover>
          <PopoverButton className="flex items-center gap-2 text-sm text-[#0055CA] font-normal border border-[#D9D9D9] rounded-[20px] p-[12px_20px] cursor-pointer">
            <FontAwesomeIcon icon={faFilter} />
            <div className="xl:block hidden">หมวดหมู่</div>
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="bg-white w-50 border border-[#D9D9D9] mt-1 py-4 px-2 rounded"
          >
            {optionCategory &&
              optionCategory.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2"
                >
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center my-1">
                    <Checkbox
                      key={item.id}
                      value={item.id}
                      checked={search.search_status.category.includes(item.id)}
                      onChange={(checked: boolean) =>
                        handleCategorySearchBox(item.id, checked)
                      }
                      className="group w-full h-full rounded border bg-white data-checked:bg-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:data-disabled:bg-gray-500"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                  </div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
          </PopoverPanel>
        </Popover>

        <Popover>
          <PopoverButton className="flex items-center gap-2 text-sm text-[#0055CA] font-normal border border-[#D9D9D9] rounded-[20px] p-[12px_20px] cursor-pointer">
            <FontAwesomeIcon icon={faFilter} />
            <div className="xl:block hidden">ประเภท</div>
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="gap-3 bg-white w-35 border border-[#D9D9D9] mt-1 py-4 px-2 rounded"
          >
            {optionType &&
              optionType.map((item, index) => (
                <div key={index} className="flex flex-row items-center">
                  <Checkbox
                    key={item.id}
                    value={item.id}
                    checked={search.search_status.type.includes(item.id)}
                    onChange={(checked: boolean) =>
                      handleTypeSearchBox(item.id, checked)
                    }
                    className="group block size-4 rounded border bg-white data-checked:bg-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:data-disabled:bg-gray-500"
                  >
                    <svg
                      className="stroke-white opacity-0 group-data-checked:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <span className="ml-2">{item.name}</span>
                </div>
              ))}
          </PopoverPanel>
        </Popover>

        <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white ">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
          />

          <input
            type="text"
            id="default-search"
            className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500 "
            placeholder="ค้นหา"
            aria-label="ค้นหา"
            value={search.search_text}
            onChange={(e) => {
              setSearch({
                ...search,
                page: 1,
                search_text: e.currentTarget.value,
              });
              setSearchParams("search_text", e.currentTarget.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
