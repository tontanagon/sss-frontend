"use client";
import { item_booking_histories } from "@/Interfaces/booking-history";
import { NotoSansThaiLooped } from "@/constants/font";
import { useEffect, useState } from "react";
import {
  faCheck,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConFirmTable({
  list_items,
  canUpdate,
  ChangeStock,
}: {
  list_items: item_booking_histories[];
  canUpdate: boolean;
  ChangeStock: any;
}) {
  const [items, setItem] = useState(list_items);
  if (canUpdate) {
    useEffect(() => {
      ChangeStock(items);
    }, [items]);
  }

  const sum_item = items?.reduce((sum: any, item: any) => {
    return sum + item.product_quantity;
  }, 0);

  const HighlightItemChange = (list: item_booking_histories, index: number) => {
    if (canUpdate) {
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
        <div className="flex gap-5">
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
            className="cursor-pointer disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span
            className={`font-medium ${
             items[index]?.product_quantity != list.product_quantity
                ? "text-[#DD0000]"
                : ""
            }`}
          >
            {items[index]?.product_quantity}{" "}
            {items[index]?.product_unit ?? "หน่วย"}
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
        <div>คงเหลือในคลัง {list?.product.stock ?? 0}</div>
      </div>
    );
  };

  return (
    <div className="p-5 my-10 bg-[#F6F6F6] border border-[#888686] text-gray-600">
      <div className="flex items-center gap-3">
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
              <th className="px-4 py-2 border border-[#DFDFDF]">จำนวน</th>
              {/* <th className="px-4 py-2 border border-[#DFDFDF]">สถานะ</th> */}
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
                  <td className="px-4 py-2 border border-[#DFDFDF]">
                    {canUpdate ? (
                      EditProductStock(list, index)
                    ) : (
                      <div>
                        {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                      </div>
                    )}
                  </td>
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

                {canUpdate ? (
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
