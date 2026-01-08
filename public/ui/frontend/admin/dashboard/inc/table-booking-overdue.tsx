"use client";

import { table_header_color, table_hover_color } from "@/constants/theme-chart";
import { BookingHistory } from "@/Interfaces/booking-history";
import { BookingStatus, style_status_class } from "@/lib/bookingStatus";
import { useRouter } from 'nextjs-toploader/app'; 
import { useEffect, useState } from "react";

export default function BookingOverdue({ serchDate = "" }: { serchDate?: Date | string }) {
  const router = useRouter();
  const [items, setItems] = useState<BookingHistory[]>();

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(
        "/medadm/api/dashboard/booking-with-status-overdue"
      );
      const data = await res.json();
      setItems(data);
    };
    getItems();
  }, [serchDate]);

  function formatDateToThai(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // เดือนเริ่มที่ 0
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-5 flex flex-col shadow-lg rounded-md w-full h-[360px]">
      <div className="text-lg font-medium mb-2">
        ตารางแสดงรายการเกินกำหนดส่งคืน
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="table-fixed w-full">
          <thead
            className={`text-white font-medium bg-[#9b27b0d0]`}
          >
            <tr className="md:text-[0.8em] text-[0.7em]">
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-s-[8px] text-end md:w-20 w-10">
                ลำดับที่
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                เลขที่การจอง
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                ชื่อ - นามสกุล
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                ชือกิจกรรม
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                วันที่ยืม
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                เบอร์โทรติดต่อ
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-r-[8px] text-start ">
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((booking: BookingHistory, index: number) => {
                const status: BookingStatus = booking.status;
                const current_styles = style_status_class[status];
                return (
                  <tr
                    onClick={() =>
                      router.push(`/medadm/requests/${booking.id}`)
                    }
                    key={index}
                    className={`bg-white border-b border-gray-200 md:text-[0.8em] text-[0.7em] hover:bg-[#F4E5F7] cursor-pointer`}
                  >
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1 text-end">
                      {index + 1}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.booking_number}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.user_code} {booking.user_name}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.activity_name}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {formatDateToThai(booking.return_at)}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.phone_number}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {current_styles.name_status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
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
