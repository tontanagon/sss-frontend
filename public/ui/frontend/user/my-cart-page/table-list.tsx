"use client";
import { useCartStore } from "@/store/cartStore";
import TableElement from "./inc/table-element";
import { useEffect, useState } from "react";


export function TableList() {
  const [items, setItems] = useState<any>();
  const [reload_item, setReloadItem] = useState<any>(false);
  const { setCartCount, setCartCountList } = useCartStore();

  useEffect(() => {
    
    const getItems = async () => {
      const res = await fetch("/api/cart/get");
      const data = await res.json();

      if (res.ok && data?.cart_items.length) {
        setItems(JSON.parse(data?.cart_items));
      }
      
    };
    getItems();
  }, [reload_item]);

  useEffect(() => {
    if (items) {
      const total_quantity = items?.reduce(
        (total: any, item: any) => total + item.quantity,
        0
      );
      setCartCount(total_quantity);
      setCartCountList(items?.length);
    }
  }, [items]);

  return (
    <div className="relative md:my-7 my-5 overflow-x-auto">
      <table className="w-full text-sm text-left table-fixed">
        <thead className="text-base text-white font-medium bg-[#0055CAE5]">
          <tr>
            <th
              scope="col"
              className="md:px-6 md:py-3  rounded-s-[8px] md:w-[100px] w-[85px]"
            ></th>
            <th scope="col" className="md:px-6 md:py-3 w-full">
              รายการ
            </th>
            <th
              scope="col"
              className="md:px-6 md:py-3 px-4 py-2 lg:table-cell w-[135px] hidden"
            >
              ประเภท
            </th>

            <th
              scope="col"
              className="md:px-6 md:py-3 px-2 py-2 text-center lg:w-[180px] w-[240px] lg:rounded-none rounded-r-[8px]"
            >
              จำนวน
            </th>
            <th
              scope="col"
              className="md:px-6 md:py-3 px-2 py-2 text-center w-[120px] lg:table-cell hidden"
            >
              หน่วย
            </th>
            <th
              scope="col"
              className="md:px-6 md:py-3 px-4 py-2 md:rounded-r-[8px] w-[80px] lg:table-cell hidden"
            ></th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((data: any, index: number) => (
              <TableElement
                key={index}
                data={data}
                reload={() => setReloadItem(!reload_item)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
