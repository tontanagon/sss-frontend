import { faFileExcel, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { QueryExport } from "../menu-query";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function ExportExcel({
  optionCategory,
  exportExcel,
}: {
  optionCategory: { id: number; name: string }[];
  exportExcel: (query: QueryExport) => void;
}) {
  const [optionTeacher, setOptionTeacher] = useState([]);
  const [optionSubject, setOptionSubject] = useState([]);
  const [queryExport, setQueryExport] = useState<QueryExport>({
    category: [],
    teacher: [],
    subject: [],
    fromDate: new Date().toISOString().split("T")[0],
    toDate: null,
  });

  useEffect(() => {
    const getOptionTeacher = async () => {
      const res = await fetch("/medadm/api/products/option/teacher");
      const data = await res.json();
      setOptionTeacher(data);
    };

    const getOptionSubject = async () => {
      const res = await fetch("/medadm/api/products/option/subject");
      const data = await res.json();
      setOptionSubject(data);
    };

    getOptionTeacher();
    getOptionSubject();
  }, []);

  const optionCategoryFormatted = optionCategory.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  return (
    // <Menu>
    //   <MenuButton className="text-white text-sm font-medium bg-[#21a366] hover:bg-[#107c41] p-[10px_20px] rounded-[10px] cursor-pointer focus:outline-none">
    //     <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
    //     Export Excel
    //   </MenuButton>

    //   <MenuItems
    //     transition
    //     anchor="bottom"
    //     className="w-50 rounded-sm border bg-white border-gray-200 p-3 text-sm/6 transition duration-100 ease-out focus:outline-none data-closed:opacity-0 shadow-lg flex flex-col mt-2"
    //   >
    //     <MenuItem>
    //       <div>ddd</div>
    //     </MenuItem>
    //     <MenuItem>
    //       <div>ddd</div>
    //     </MenuItem>
    //     <MenuItem>
    //       <div>ddd</div>
    //     </MenuItem>
    //     <MenuItem>
    //       <div>ddd</div>
    //     </MenuItem>
    //   </MenuItems>
    // </Menu>
    <Popover>
      <PopoverButton className="text-white text-sm font-medium bg-[#21a366] hover:bg-[#107c41] py-2 px-4 rounded-[10px] cursor-pointer focus:outline-none">
        <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
        Export Excel
      </PopoverButton>

      <PopoverPanel
        anchor="bottom"
        className="bg-white w-100 h-130 border border-[#D9D9D9] mt-3 p-5 rounded flex flex-col gap-4 overflow-y-auto"
      >
        <div className="text-lg font-bold">Export รายการวัสดุ</div>

        {optionCategoryFormatted && (
          <div className="flex flex-col items-start gap-2">
            <div className="text-base font-medium">หมวดหมู่</div>
            <Select
              isMulti
              placeholder="ทั้งหมด"
              options={optionCategoryFormatted}
              className="w-full focus:outline-none"
              classNamePrefix="select-category"
              onChange={(selected) => {
                setQueryExport({
                  ...queryExport,
                  category: Array.isArray(selected)
                    ? selected.map((item) => item.value)
                    : null,
                });
              }}
            />
          </div>
        )}

        {optionTeacher && (
          <div className="flex flex-col items-start gap-2">
            <div className="text-base font-medium">อาจารย์</div>
            <Select
              isMulti
              placeholder="ทั้งหมด"
              options={optionTeacher}
              className="w-full focus:outline-none"
              classNamePrefix="select-teacher"
              onChange={(selected) => {
                setQueryExport({
                  ...queryExport,
                  teacher: Array.isArray(selected)
                    ? selected.map((item: any) => item.value)
                    : null,
                });
              }}
            />
          </div>
        )}

        {optionSubject && (
          <div className="flex flex-col items-start gap-2">
            <div className="text-base font-medium">กระบวนวิชา</div>
            <Select
              isMulti
              placeholder="ทั้งหมด"
              options={optionSubject}
              className="w-full focus:outline-none"
              classNamePrefix="select-subject"
              onChange={(selected) => {
                setQueryExport({
                  ...queryExport,
                  subject: Array.isArray(selected)
                    ? selected.map((item: any) => item?.value)
                    : null,
                });
              }}
            />
          </div>
        )}

        <div className="flex gap-4 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-base font-medium mr-2">จากวันที่</label>
            <input
              type="date"
              placeholder="ทั้งหมด"
              value={queryExport.fromDate || ""}
              onChange={(e) =>
                setQueryExport({
                  ...queryExport,
                  fromDate: e.target.value,
                })
              }
              className="border border-[#cccccc] focus:outline-none p-2 rounded-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-base font-medium mr-2">ถึงวันที่</label>
            <input
              type="date"
              placeholder="ทั้งหมด"
              value={queryExport.toDate || ""}
              min={
                queryExport?.fromDate
                  ? new Date(queryExport.fromDate).toISOString().slice(0, 10)
                  : undefined
              }
              onChange={(e) =>
                setQueryExport({
                  ...queryExport,
                  toDate: e.target.value,
                })
              }
              className="border border-[#cccccc] focus:outline-none p-2 rounded-sm w-full"
            />
          </div>
        </div>

        <button
          className="mt-4 w-full bg-[#0055CA] text-white p-2 rounded-lg hover:bg-[#004bb8] cursor-pointer"
          onClick={() => exportExcel(queryExport)}
        >
          ส่งออก Excel
        </button>
      </PopoverPanel>
    </Popover>
  );
}
