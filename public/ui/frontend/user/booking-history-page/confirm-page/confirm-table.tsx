"use client";
import { item_booking_histories } from "@/Interfaces/booking-history";
import { NotoSansThaiLooped } from "@/constants/font";
import { useEffect, useState } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@headlessui/react";

export default function ConFirmTable({
  list_items,
  ChangeStock,
  canUpdate,
}: {
  list_items: item_booking_histories[];
  ChangeStock: any;
  canUpdate: boolean;
}) {
  const [items, setItem] = useState(list_items);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const sum_item = list_items?.reduce((sum: any, item: any) => {
    return sum + item.product_quantity;
  }, 0);

  useEffect(() => {
    if (items) {
      ChangeStock(items);
    }
  }, [items]);

  useEffect(() => {
    setCheckedItems(new Array(items.length).fill(false));
  }, []);

  const Edit_return = (list: item_booking_histories, index: number) => {
    const product_quantity_style =
      items[index].product_quantity_return !=
        list.product_quantity && list.product_type === "ยืมคืน"
        ? "text-[#DD0000]"
        : list.product_quantity_return <= 0 &&
          list.product_type === "ใช้เเล้วหมดไป"
        ? "text-orange-500"
        : "";
    return (
      <div className="flex lg:flex-row sm:flex-col lg:justify-around sm:gap-0 gap-3 lg:items-center text-sm">
        <div className="sm:hidden block ">จำนวนที่คืน : </div>
        <div className="flex gap-5">
          <button
            type="button"
            disabled={list.product_quantity_return <= 0}
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
          <div className={`font-semibold ${product_quantity_style}`}>
            {list.product_quantity_return}
          </div>
          <button
            type="button"
            disabled={list.product_quantity_return >= list.product_quantity}
            onClick={() => {
              const newChecked = [...checkedItems];
              newChecked[index] = false;
              setCheckedItems(newChecked);

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

        <div className="flex flex-row items-center">
          <Checkbox
            checked={checkedItems[index] || false}
            onChange={(checked: boolean) => {
              const newChecked = [...checkedItems];
              newChecked[index] = checked;
              setCheckedItems(newChecked);

              setItem((prev) =>
                prev.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        product_quantity_return: checked
                          ? 0
                          : list_items[index].product_quantity,
                      }
                    : item
                )
              );
            }}
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
          {list.product_type === "ยืมคืน" ? (
            <div className="ml-2">หาย</div>
          ) : (
            <div className="ml-2">หมด</div>
          )}
        </div>
      </div>
    );
  };

  const HighlightItemChange = (list: item_booking_histories, index: number) => {
    if (canUpdate) {
      return list.product_type === "ยืมคืน" &&
        items[index].product_quantity_return !=
          list.product_quantity
        ? "bg-[#ffecec]"
        : list.product_type === "ใช้เเล้วหมดไป" &&
          items[index].product_quantity_return <= 0
        ? "text-gray-400"
        : "";
    }

    return "";
  };

  return (
    <div className="p-5 my-10 bg-[#F6F6F6] border border-[#888686] text-gray-600">
      <div className="flex items-center gap-3">
        <p className="text-xl font-bold mb-2">รายการอุปกรณ์</p>
        <div className="text-sm font-normal mb-2 ">
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
              {canUpdate ? (
                <>
                  <th className="px-4 py-2 border border-[#DFDFDF] text-end">
                    จำนวนที่ยืม
                  </th>
                  <th className="px-4 py-2 border border-[#DFDFDF] text-end">
                    จำนวนที่คืน
                  </th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2 border border-[#DFDFDF] text-end">
                    จำนวน
                  </th>
                </>
              )}
              {/* <th className="px-4 py-2 border border-[#DFDFDF]">สถานะ</th> */}
            </tr>
          </thead>

          <tbody className="bg-white font-normal">
            {items?.map((list: item_booking_histories, index: number) => {
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
                  {canUpdate ? (
                    <>
                      <td className="px-4 py-2 border border-[#DFDFDF]">
                        <div className="text-end">
                          {list.product_quantity}{" "}
                          {list?.product_unit ?? "หน่วย"}
                        </div>
                      </td>
                      <td className="px-4 py-2 border border-[#DFDFDF]">
                        {Edit_return(list, index)}
                      </td>
                    </>
                  ) : (
                    <td className="px-4 py-2 border border-[#DFDFDF]">
                      <div className="text-end">
                        {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto sm:hidden block space-y-4">
        {items &&
          items.map((list: item_booking_histories, index: number) => {
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
                  <>
                    <div className="text-sm">
                      <span className="font-medium">จำนวนที่ยืม:</span>{" "}
                      {list.product_quantity} {list?.product_unit ?? "หน่วย"}
                    </div>
                    <div className="text-sm">
                      {/* <span className="font-medium">จำนวนที่คืน:</span>{" "} */}
                      {Edit_return(list, index)}
                    </div>
                  </>
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
