"use client";
import { BookingHistory, BookingList } from "@/Interfaces/booking-history";
import TableElementTap from "./taps-table-element";
import { useEffect, useState } from "react";
import Pagination from "@/ui/layout/pagination";

import { Checkbox } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
interface search {
  search_text: string;
  search_status?: (string | null)[];
  pagination: number;
}

export default function TableTaps({
  search,
  setSearch,
  data,
  setArrayPrint,
}: {
  data: BookingList;
  search: search;
  setSearch: any;
  setArrayPrint: any;
}) {
  const search_path_status = useSearchParams().get("status");
  const [items, setItems] = useState<BookingList>(data);
  const [nextPage, setNextPage] = useState<string>("");

  const [check, setCheckPrint] = useState<any>([]);

  const allChecked = items?.data?.map((item) => item.id);

  useEffect(() => {
    const getItems = async () => {
      

      const res = await fetch("/api/pagination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nextPage: nextPage,
          query: search,
        }),
      });
      if (res.ok) {
        const data_res = await res.json();
        setItems(data_res);
      }
    };
    if (nextPage) {
      getItems();
      
    }
  }, [nextPage]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    setCheckPrint([]);
    setNextPage("");
  }, [search_path_status]);

  useEffect(() => {
    setArrayPrint(check);
  }, [check]);

  const search_paignation = (page: number) => {
    setSearch({ ...search, pagination: page });
  };

  const checkAll = (checked: boolean) => {
    if (checked) {
      setCheckPrint(allChecked);
    } else {
      setCheckPrint([]);
    }
  };

  const handleCheck = (id: number) => {
    setCheckPrint((prev: any) =>
      prev.includes(id)
        ? prev.filter((itemId: number) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <div className="my-5 flex items-center gap-3 mx-4 md:hidden">
        <Checkbox
          // key={item.name}
          // value={}
          checked={check.length > 0 && check.length === allChecked.length}
          onChange={(checked: boolean) => checkAll(checked)}
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
        <div className="">เลือกทั้งหมด</div>
      </div>
      <table className="responsive-table w-full text-sm text-left table-auto mb-3">
        <thead className="text-sm text-[#FAFAFA] font-semibold bg-[#0055CAE5]">
          <tr>
            <th scope="col" className="rounded-s-[8px] w-[20px]">
              <div className="flex justify-start items-center gap-2 px-4">
                <Checkbox
                  // key={item.name}
                  // value={}
                  checked={
                    check.length > 0 && check.length === allChecked.length
                  }
                  onChange={(checked: boolean) => checkAll(checked)}
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
                <div className="xl:block hidden">ทั้งหมด</div>
              </div>
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-4 py-2">
              รหัสการจอง
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-4 py-2">
              ชื่อ - สกุล
            </th>

            <th
              scope="col"
              className="text-center sm:px-4 sm:py-2 px-4 py-2 xl:table-cell hidden"
            >
              ชั้นปี
            </th>
            <th
              scope="col"
              className="sm:px-4 sm:py-2 px-4 py-2 text-end xl:table-cell hidden"
            >
              จำนวนรายการ
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-2 py-2 ">
              วันที่เบิก
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-4 py-2 ">
              วันที่คืน
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-4 py-2">
              สถานะ
            </th>
            <th
              scope="col"
              className="sm:px-4 sm:py-2 px-4 py-2 sm:rounded-r-[8px] sm:table-cell hidden"
            ></th>
          </tr>
        </thead>
        {items && items?.data?.length > 0
          ? items.data.map((item: BookingHistory, index: number) => (
              <TableElementTap
                key={index}
                data={item}
                addCheckPrint={(id: number) => handleCheck(id)}
                checkPrint={check}
              />
            ))
          : ""}
      </table>
      {items && items?.data?.length > 0 ? (
        ""
      ) : (
        <div className="text-center text-gray-400 italic py-10">
          ไม่พบการรายการ
        </div>
      )}
      {items && (
        <Pagination
          data={items}
          setNextPage={setNextPage}
          search_paignation={search_paignation}
        />
      )}
    </>
  );
}
