"use client";
import { BookingHistory } from "@/Interfaces/booking-history";
import { Paginations } from "@/Interfaces/products";
import Pagination from "@/ui/layout/pagination";
import { useEffect, useState } from "react";
import TableElementTap from "./table-approve-element";
interface search {
  search_text: string;
  pagination: number;
}

export default function TableApprove({
  search,
  setSearch,
  data,
}: {
  search: search;
  setSearch: any;
  data: any;
}) {
  const [nextPage, setNextPage] = useState("");
  const [items, setItem] = useState<Paginations>(data);

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
        setItem(data_res);
      }
    };
    if (nextPage) {
      getItems();
    }
  }, [nextPage]);

  useEffect(() => {
    setItem(data);
  }, [data]);

  useEffect(() => {
    setNextPage("");
  }, [search]);

  const scrollToSection = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="responsive-table w-full text-sm text-left table-auto mb-5">
        <thead className="text-sm text-[#FAFAFA] font-semibold bg-[#0055CAE5]">
          <tr>
            <th
              scope="col"
              className="sm:px-4 sm:py-2 px-4 py-2 rounded-s-[8px]"
            >
              รหัสการจอง
            </th>
            <th scope="col" className="sm:px-4 sm:py-2 px-4 py-2">
              ชื่อ - สกุล
            </th>
            <th scope="col" className="text-center sm:px-4 sm:py-2 px-4 py-2">
              ชั้นปี
            </th>
            <th
              scope="col"
              className="sm:px-4 sm:py-2 px-4 py-2 text-center xl:table-cell md:hidden"
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
        {items?.data.length > 0
          ? items?.data.map((item: BookingHistory, index: number) => (
              <TableElementTap key={index} data={item} />
            ))
          : ""}
      </table>
      <Pagination
        data={items}
        setNextPage={setNextPage}
        search_paignation={(perpage: number) =>
          setSearch({ ...search, pagination: perpage })
        }
      />
    </div>
  );
}
