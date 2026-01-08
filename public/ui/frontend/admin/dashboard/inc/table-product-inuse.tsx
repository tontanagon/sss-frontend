"use client";
import { table_header_color, table_hover_color } from "@/constants/theme-chart";
import { formatDateToThai } from "@/lib/changeDateToThai";
import { useEffect, useState } from "react";

interface DataProductInuse {
  product_name: string;
  user_name: string;
  booking_number: string;
  booking_at: string;
}

export default function ProductInuse({ serchDate = "" }: { serchDate?: Date | string }) {
  const [items, setItems] = useState<DataProductInuse[]>();

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("/medadm/api/dashboard/product-inuse");
      const data = await res.json();
      setItems(data);
    };
    getItems();
  }, [serchDate]);

  return (
    <div className="p-5 flex flex-col shadow-lg rounded-md w-full h-[360px]">
      <div className="text-lg font-medium mb-2">
        ตารางแสดงวัสดุ-อุปกรณ์ที่กำลังถูกใช้งาน
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="table-fixed w-full">
          <thead
            className={`text-white font-medium bg-[#9b27b0d0]`}
          >
            <tr className="md:text-[0.8em] text-[0.7em]">
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-s-[8px] text-start">
                ชื่อวัสดุ
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                ยืมโดย
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                เลขที่การจอง
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-r-[8px] text-start ">
                ถูกยืมเมื่อ
              </th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((booking: DataProductInuse, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`bg-white border-b border-gray-200 md:text-[0.8em] text-[0.7em] hover:bg-[#F4E5F7] `}
                  >
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.product_name}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.user_name}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.booking_number}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {formatDateToThai(booking.booking_at)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-5 font-medium"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
