"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotoSansThaiLooped } from "@/constants/font";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import TableList from "./table-list";
import Link from "next/link";
import { BookingHistory } from "@/Interfaces/booking-history";
import { style_status_class, BookingStatus } from "@/lib/bookingStatus";

// import { style_status_class, BookingStatus } from "";

export default function TableElementTap({ data }: { data: BookingHistory }) {
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
          <td
            className="px-4 py-2 md:text-sm text-lg font-semibold text-[#1D3557]"
            data-label="รหัสการจอง"
          >
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

          <td className="md:text-center px-4 py-2" data-label="ชั้นปี">
            {data.user_grade}
          </td>
          <td className="px-4 py-2 md:text-center xl:table-cell md:hidden" data-label="จำนวนรายการ">
            {list_items.length}
          </td>
          <td className="px-4 py-2" data-label="วันที่เบิก">
            {formatDateToThai(data.created_at)}
          </td>
          <td className="px-4 py-2" data-label="วันที่คืน">
            {formatDateToThai(data.return_at)}
          </td>
          <td className="px-4 py-2" data-label="สถานะ">
            <span
              className={`${
                current_styles.style_status || ""
              } rounded-full px-2 inline-block text-center`}
            >
              {current_styles.name_status}
            </span>
          </td>
          <td data-label="รายละเอียด">
            <Link
              href={`medtch/${data.id}`}
              className=" seft-items-end text-sm font-normal text-center rounded-[8px] p-[5px_10px] bg-[#0B9BB5] text-white hover:bg-[#09798d] inline-block"
            >
              <FontAwesomeIcon icon={current_styles.icon} /> ดูรายละเอียด
            </Link>
          </td>
        </tr>

        <DisclosurePanel
          as="tr"
          className="bg-[#F6F6F6] md:table-row hidden-activity-name"
        >
          <td colSpan={8}>
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
                      <th className="px-4 py-2 border border-[#DFDFDF]">
                        จำนวน
                      </th>
                      {/* <th className="px-4 py-2 border border-[#DFDFDF]">
                        สถานะ
                      </th> */}
                    </tr>
                  </thead>

                  <tbody className="bg-white font-normal">
                    {list_items.map((list: any, index: number) => (
                      <TableList key={index} list={list} />
                    ))}
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
