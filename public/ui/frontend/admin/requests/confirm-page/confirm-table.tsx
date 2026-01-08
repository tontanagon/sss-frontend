"use client";
import { item_booking_histories } from "@/Interfaces/booking-history";
import TableList from "../inc/table-list";
import { NotoSansThaiLooped } from "@/constants/font";
import {
  faCheck,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ConFirmTable({
  list_items,
  canConfirm,
  ChangeStock,
}: {
  list_items: item_booking_histories[];
  canConfirm: string;
  ChangeStock: (item: any) => void;
}) {
  const [items, setItem] = useState(list_items);
  const canEdit = ["pending", "approved", "returned"].includes(canConfirm);

  useEffect(() => {
    if (!canEdit) return;
    ChangeStock(items);
  }, [canConfirm, items]);

  const sum_item = list_items?.reduce((sum: any, item: any) => {
    return sum + item.product_quantity;
  }, 0);

  const HighlightItemChange = (list: item_booking_histories, index: number) => {
    if (canConfirm === "returned") {
      return list.product_type === "ยืมคืน" &&
        items[index].product_quantity_return != list.product_quantity
        ? "bg-[#ffecec]"
        : list.product_type === "ใช้เเล้วหมดไป" &&
          items[index].product_quantity_return <= 0
        ? "text-gray-400"
        : "";
    } else if (canEdit) {
      return items[index].product_quantity != list.product_quantity
        ? "bg-[#ffecec]"
        : "";
    }

    return "";
  };

  const EditProductStock = (list: item_booking_histories, index: number) => {
    
    return (
      <div className="flex lg:justify-around lg:flex-row sm:flex-col items-center text-sm sm:gap-0 gap-3 ">
        <div className="sm:hidden block">จำนวน : </div>
        <div className="flex lg:gap-5 gap-2">
          <button
            type="button"
            disabled={items[index].product_quantity <= 0}
            onClick={() => {
              setItem((prev) =>
                prev.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        product_quantity: item.product_quantity - 1,
                      }
                    : item
                )
              );
            }}
            className="cursor-pointer disabled:opacity-40 "
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span
            className={`font-semibold ${
              items[index].product_quantity != list.product_quantity
                ? "text-[#DD0000]"
                : ""
            }`}
          >
            {items[index].product_quantity} {list?.product_unit ?? "หน่วย"}
          </span>
          <button
            type="button"
            disabled={
              items[index]?.product_quantity >=
              list?.product?.stock + list?.product_quantity
            }
            onClick={() => {
              setItem((prev) =>
                prev.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        product_quantity: item.product_quantity + 1,
                      }
                    : item
                )
              );
            }}
            className="cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div>คงเหลือในคลัง {list?.product?.stock ?? 0}</div>
      </div>
    );
  };

  const EditReturnStock = (list: item_booking_histories, index: number) => {
    const product_quantity_style =
      items[index].product_quantity_return != list.product_quantity &&
      list.product_type === "ยืมคืน"
        ? "text-[#DD0000]"
        : items[index].product_quantity_return <= 0 &&
          list.product_type === "ใช้เเล้วหมดไป"
        ? "text-orange-500"
        : "";
    return (
      <div className="flex lg:justify-end lg:flex-row sm:flex-col items-center text-sm sm:gap-0 gap-3">
        <div className="sm:hidden block font-medium">จำนวนที่คืน : </div>
        <div className="flex lg:gap-5 gap-2 text-[#171717]">
          <button
            type="button"
            disabled={items[index].product_quantity_return <= 0}
            onClick={() => {
              setItem((prev) =>
                prev.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        product_quantity_return:
                          item.product_quantity_return - 1,
                      }
                    : item
                )
              );
            }}
            className="cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={`font-semibold ${product_quantity_style}`}>
            {items[index].product_quantity_return}{" "}
            {list?.product_unit ?? "หน่วย"}
          </span>
          <button
            type="button"
            disabled={
              items[index]?.product_quantity_return >=
              items[index]?.product_quantity
            }
            onClick={() => {
              setItem((prev) =>
                prev.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        product_quantity_return:
                          item.product_quantity_return + 1,
                      }
                    : item
                )
              );
            }}
            className="cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 my-10 bg-[#F6F6F6] border border-[#888686]">
      <div className="flex gap-3 items-center">
        <p className="text-xl font-bold mb-2">รายการอุปกรณ์</p>
        <div className="text-sm font-normal mb-2">
          รวมทั้งหมด: {list_items?.length} รายการ {sum_item} ชิ้น
        </div>
      </div>

      <div className="overflow-x-auto sm:block hidden">
        <table className="w-full text-sm text-center table-auto">
          <thead
            className={`bg-[#EDEDED] font-semibold ${NotoSansThaiLooped.className}`}
          >
            <tr>
              <th className="px-4 py-2 border border-[#DFDFDF]">ชื่ออุปกรณ์</th>
              <th className="px-4 py-2 border border-[#DFDFDF]">หมวดหมู่</th>
              <th className="px-4 py-2 border border-[#DFDFDF]">ประเภท</th>
              {canConfirm === "returned" ? (
                <>
                  <th className="px-4 py-2 border text-end border-[#DFDFDF]">
                    จำนวนที่ยืม
                  </th>
                  <th className="px-4 py-2 border text-end border-[#DFDFDF]">
                    จำนวนที่คืน
                  </th>
                </>
              ) : (
                <th className="px-4 py-2 border text-end border-[#DFDFDF]">
                  จำนวน
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white font-normal">
            {list_items?.map((list: item_booking_histories, index: number) => {
              const category = JSON.parse(list.product_category);
              return (
                <tr key={index} className={HighlightItemChange(list, index)}>
                  <td className="px-4 py-2 border border-[#DFDFDF]">
                    {list.product_name}
                  </td>
                  <td className="px-4 py-2 border border-[#DFDFDF]">
                    {category.map((cate: string) => cate).join(", ")}
                  </td>
                  <td className="px-4 py-2 border border-[#DFDFDF]">
                    {list.product_type}
                  </td>
                  {canConfirm === "returned" ? (
                    <>
                      <td className="px-4 py-2 border text-end border-[#DFDFDF]">
                        {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                      </td>
                      <td className="px-4 py-2 border text-end border-[#DFDFDF]">
                        {EditReturnStock(list, index)}
                        {/* {list.product_quantity_return}{" "}
                        {list?.product_unit ?? "หน่วย"} */}
                      </td>
                    </>
                  ) : canEdit ? (
                    <td className="px-4 py-2 border text-end border-[#DFDFDF]">
                      {EditProductStock(list, index)}
                    </td>
                  ) : (
                    <td className="px-4 py-2 border text-end border-[#DFDFDF]">
                      {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto sm:hidden block space-y-4">
        {list_items &&
          list_items.map((list: item_booking_histories, index: number) => {
            const category = JSON.parse(list.product_category);
            return (
              <div
                key={index}
                className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-800">
                    {list.product_name}
                  </h3>
                </div>

                <div className="text-sm">
                  <span className="font-medium">หมวดหมู่:</span>{" "}
                  {category.map((cate: string) => cate).join(", ")}
                </div>

                <div className="text-sm">
                  <span className="font-medium">ประเภท:</span>{" "}
                  {list.product_type}
                </div>
                {canConfirm === "returned" ? (
                  <>
                    <div className="text-sm">
                      <span className="font-medium">จำนวนที่ยืม:</span>{" "}
                      {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                    </div>
                    <div className="text-sm">
                      {EditReturnStock(list, index)}
                    </div>
                  </>
                ) : canEdit ? (
                  EditProductStock(list, index)
                ) : (
                  <div className="text-sm">
                    <span className="font-medium">จำนวน:</span>{" "}
                    {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
