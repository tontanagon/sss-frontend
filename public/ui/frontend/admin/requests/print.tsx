"use client";

import {
  BookingHistory,
  item_booking_histories,
} from "@/Interfaces/booking-history";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { style_status_class, BookingStatus } from "@/lib/bookingStatus";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { NotoSansThaiLooped } from "@/constants/font";

export default function Print() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const search_path_status = searchParams.get("status");

  const [items, setItems] = useState<BookingHistory[]>();

  function formatDateToThai(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // เดือนเริ่มที่ 0
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`/medadm/api/requests/print/preview?id=${id}`);
      const data = await res.json();
      setItems(data);
    };
    getItems();
    
  }, []);
  return (
    <div className=" print:bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mx-6 mt-3 print:mx-0 print:mt-0">
        <Link
          href={{
            pathname: "/medadm/requests",
            ...(search_path_status
              ? { query: { status: search_path_status } }
              : {}),
          }}
          className="flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] text-base font-semibold print:hidden"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>กลับ</p>
          <p>รายการคำขอ</p>
        </Link>

        <button
          className="flex items-center gap-2 text-sm text-white bg-[#0055CA] font-normal rounded-[20px] p-[12px_20px] cursor-pointer border hover:bg-white hover:text-[#0055CA] hover:border-[#0055CA] transition-colors print:hidden"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>

      {/* Loop รายการ */}
      {items && items.length ? (
        items.map((item: BookingHistory, key: number) => {
          // const status: BookingStatus = item.status;
          // const current_styles = style_status_class[status];
          return (
            <div
              key={key}
              className={`relative border border-gray-300 shadow-sm m-6 p-6 print:pr-2 print:m-0 print:shadow-none print:border-0 text-md bg-white ${
                NotoSansThaiLooped.className
              } ${
                items.length === key + 1
                  ? "break-after-auto"
                  : "break-after-page"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    className="object-contain w-[35px] h-[35px]"
                  />
                  <div className="text-[#264981]">
                    <span className="flex gap-1 self-center font-semibold whitespace-nowrap text-sm ">
                      Smart Store <p className="text-[#9D76B3]">System</p>
                    </span>
                    <p className="text-[10px]">
                      Faculty of Computer Science
                    </p>
                  </div>
                </div>
                <div className="text-cente">
                  <h1 className="text-xl font-bold">ใบรายงานการยืมอุปกรณ์</h1>
                  {/* <p className="text-gray-600 text-sm">
                  พิมพ์เมื่อวันที่ {new Date().toLocaleDateString("th-TH")}
                </p> */}
                </div>
              </div>

              {/* ข้อมูลผู้ยืม */}
              <div className="grid grid-cols-2 gap-7 mb-5">
                <div className="space-y-1">
                  <div className="flex gap-3">
                    <span className="font-semibold w-30">หมายเลขการจอง:</span>
                    <span>{item.booking_number}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold w-30">รหัสนักศึกษา:</span>
                    <span>{item.user_code}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold w-30">ชื่อ - นามสกุล:</span>
                    <span>{item.user_name}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold w-30">กระบวนวิชา:</span>
                    <span>{item?.subjects?.display_name ?? item.subject}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold w-30">อาจารย์ผู้สอน:</span>
                    <span>{item.teacher}</span>
                  </div>
                </div>

                <div className="flex flex-row-reverse text-md gap-1">
                  <div className="border border-gray-300 rounded-md h-fit w-50">
                    <div className="text-center border-b border-gray-300 font-semibold bg-gray-50 py-1 rounded-t-md">
                      วันที่ยืม
                    </div>
                    <div className="text-center py-1">
                      {formatDateToThai(item.created_at)}
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-md h-fit w-50">
                    <div className="text-center border-b border-gray-300 font-semibold bg-gray-50 py-1 rounded-t-md">
                      วันที่คืน
                    </div>
                    <div className="text-center py-1">
                      {formatDateToThai(item.return_at)}
                    </div>
                  </div>
                </div>
              </div>

              {/* ตารางอุปกรณ์ */}
              <div className="my-5">
                <table className="w-full text-sm border border-gray-300">
                  <thead className="bg-gray-100 font-semibold text-gray-700">
                    <tr>
                      <th className="px-3 py-2 border border-gray-300 text-end w-[60px]">
                        ลำดับ
                      </th>
                      <th className="px-3 py-2 border border-gray-300 text-start">
                        ชื่ออุปกรณ์
                      </th>
                      <th className="px-3 py-2 border border-gray-300 text-start">
                        หมวดหมู่
                      </th>
                      <th className="px-3 py-2 border border-gray-300 text-start">
                        ประเภท
                      </th>
                      <th className="px-3 py-2 border border-gray-300 text-end w-[100px]">
                        จำนวน
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-800">
                    {item?.item_booking_histories?.map(
                      (i: item_booking_histories, index: number) => {
                        const category = JSON.parse(i.product_category);
                        return (
                          <tr key={i.id}>
                            <td className="px-3 py-1 border border-gray-300 text-end">
                              {index + 1}
                            </td>
                            <td className="px-3 py-1 border border-gray-300">
                              {i.product_name}
                            </td>
                            <td className="px-3 py-1 border border-gray-300">
                              {category.join(", ")}
                            </td>
                            <td className="px-3 py-1 border border-gray-300">
                              {i.product_type}
                            </td>
                            <td className="px-3 py-1 border border-gray-300 text-end">
                              {i.product_quantity}
                            </td>
                          </tr>
                        );
                      }
                    )}
                    <tr className="font-semibold bg-gray-50">
                      <td
                        colSpan={4}
                        className="px-3 py-2 border border-gray-300 text-end"
                      >
                        รวมทั้งหมด
                      </td>
                      <td className="px-3 py-2 border border-gray-300 text-end">
                        {item?.item_booking_histories.reduce(
                          (sum: any, i: any) => sum + i.product_quantity,
                          0
                        )}{" "}
                        ชิ้น
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 mt-10">ไม่มีรายการ</div>
      )}
    </div>
  );
}
