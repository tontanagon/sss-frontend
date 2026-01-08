"use client";
import Pagination from "@/ui/layout/pagination";
import TableElementTap from "./taps-table-element";
import {
  BookingHistory,
  BookingList,
  fetchDataBookingHistory,
} from "@/Interfaces/booking-history";
import { useEffect, useState } from "react";
import "@/ui/css/table-responsive.css";

interface search {
  search_text: string;
  search_status: string[];
  pagination: number;
}

export default function TableTaps({
  search,
  setSearch,
  data,
}: {
  data: BookingList;
  search: search;
  setSearch: any;
}) {
  const [items, setItems] = useState<BookingList>(data);
  const [nextPage, setNextPage] = useState<string>();

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
    setNextPage("");
  }, [search]);

  const search_paignation = (page: number) => {
    setSearch({ ...search, pagination: page });
  };

  return (
    <div className="overflow-x-auto">
      <table className="responsive-table text-sm text-left table-auto w-full md:mb-5">
        <thead className="text-sm font-semibold text-white bg-[#0055CAE5]">
          <tr>
            <th scope="col" className="px-4 py-2 rounded-l-[8px]">
              รหัสการจอง
            </th>
            <th scope="col" className="px-4 py-2">
              ชื่อกิจกรรม
            </th>
            <th scope="col" className="px-4 py-2 text-end">
              จำนวนรายการ
            </th>
            <th scope="col" className="px-4 py-2">
              วันที่เบิก
            </th>
            <th scope="col" className="px-4 py-2">
              วันที่คืน
            </th>
            <th scope="col" className="px-4 py-2">
              สถานะ
            </th>
            <th
              scope="col"
              className="px-4 py-2 rounded-r-[8px] hidden sm:table-cell"
            ></th>
          </tr>
        </thead>
        {items?.data.map((item: BookingHistory, index: number) => (
          <TableElementTap key={index} data={item} />
        ))}
      </table>
      <Pagination
        data={items}
        setNextPage={setNextPage}
        search_paignation={(perpage: number) =>
          setSearch({ ...search, pagination: perpage })
        }
        // hrefTo={() => scrollToSection()}
      />
    </div>
  );
}
