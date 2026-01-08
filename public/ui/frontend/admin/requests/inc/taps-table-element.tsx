"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotoSansThaiLooped } from "@/constants/font";
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import TableList from "./table-list";
import Link from "next/link";
import {
  BookingHistory,
  item_booking_histories,
} from "@/Interfaces/booking-history";
import { style_status_class, BookingStatus } from "@/lib/bookingStatus";

import { useSearchParams } from "next/navigation";

export default function TableElementTap({
  data,
  addCheckPrint,
  checkPrint,
}: {
  data: BookingHistory;
  addCheckPrint: any;
  checkPrint: any;
}) {
  const search_path_status = useSearchParams().get("status");
  const status: BookingStatus = data.status;
  const current_styles = style_status_class[status];

  function formatDateToThai(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // เดือนเริ่มที่ 0
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day}/${month}/${year}`;
  }
  const list_items = data.item_booking_histories;
  const sum_item = list_items.reduce((sum: any, item: any) => {
    return sum + item.product_quantity;
  }, 0);

  return (
    <tbody>
      <Disclosure>
        <tr className="bg-white border-b border-gray-200">
          <td className="px-4 py-2" data-label="checkbox">
            <Checkbox
              // value={false}
              checked={checkPrint.includes(data.id)}
              onChange={() => addCheckPrint(data.id)}
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
          </td>
          <td className="md:text-start px-4 py-2" data-label="รหัสการจอง">
            {data.booking_number}
          </td>
          <DisclosureButton
            as="td"
            data-label="ชื่อ - สกุล"
            className="group hidden-activity-name md:table-cell md:items-center md:gap-2 text-[#1D3557] p-[20px] cursor-pointer transition"
          >
            <div className="flex items-center gap-2 w-full">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="transition-transform duration-200 group-data-[open]:rotate-180"
              />
              <div
                className={`text-sm font-semibold break-words ${NotoSansThaiLooped.className}`}
              >
                {data.user_code} {data.user_name}
              </div>
            </div>
          </DisclosureButton>
          <td
            data-label="ชื่อ - สกุล"
            className="block md:hidden text-[#1D3557] text-sm font-semibold px-4 pt-2 pb-1"
          >
            {data.user_code} {data.user_name}
          </td>
          <td
            className="md:text-center px-4 py-2 xl:table-cell hidden"
            data-label="ชั้นปี"
          >
            {data.user_grade}
          </td>
          <td
            className="px-4 py-2 md:text-end xl:table-cell hidden"
            data-label="จำนวนรายการ"
          >
            {list_items.length}
          </td>
          <td className="px-4 py-2" data-label="วันที่เบิก">
            {formatDateToThai(data.created_at)}
          </td>
          <td className="px-4 py-2" data-label="วันที่คืน">
            {formatDateToThai(data.return_at)}
          </td>
          <td className="px-4 py-2" data-label="สถานะ">
            <div
              className={`${
                current_styles.style_status || ""
              } rounded-full px-2 w-fit text-center`}
            >
              {current_styles.name_status}
            </div>
          </td>
          <td className="px-4 py-2 md:text-end" data-label="รายละเอียด">
            <Link
              className={`${
                current_styles.style_button || ""
              } text-sm font-normal text-center rounded-[8px] p-[5px_10px] w-fit inline-block`}
              href={{
                pathname: "/medadm/requests/" + data.id,
                ...(search_path_status
                  ? { query: { status: search_path_status } }
                  : {}),
              }}
              onNavigate={(e) => {
                
              }}
            >
              <FontAwesomeIcon icon={current_styles.icon} />
              ดูรายละเอียด
            </Link>
          </td>
        </tr>

        <DisclosurePanel
          as="tr"
          className="bg-[#F6F6F6] md:table-row hidden-activity-name"
        >
          <td colSpan={9}>
            <div className="p-4">
              <p className="text-sm font-bold mb-2">รายละเอียด</p>
              <div className="text-sm font-normal mb-2">
                กระบวนวิชา:{data.subject}|อาจารย์:{data.teacher}
                |จำนวนรายการทั้งหมด: {list_items.length} รายการ {sum_item} ชิ้น
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center table-auto">
                  <thead
                    className={`bg-[#EDEDED] font-semibold ${NotoSansThaiLooped.className}`}
                  >
                    <tr>
                      <th className="px-4 py-2 border border-[#DFDFDF]">
                        ชื่ออุปกรณ์
                      </th>
                      <th className="px-4 py-2 border border-[#DFDFDF]">
                        หมวดหมู่
                      </th>
                      <th className="px-4 py-2 border border-[#DFDFDF]">
                        ประเภท
                      </th>
                      <th className="px-4 py-2 border text-end border-[#DFDFDF]">
                        จำนวน
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white font-normal">
                    {list_items.map(
                      (list: item_booking_histories, index: number) => (
                        <TableList key={index} list={list} canConfirm={false} />
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </DisclosurePanel>
      </Disclosure>
    </tbody>
  );
}
