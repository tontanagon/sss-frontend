"use client";
import OneItemList from "@/ui/frontend/user/home-page/inc/one-item-list";
import { useEffect, useRef, useState } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import {
  faCircleCheck,
  faCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cartStore";
import { ApiResponse } from "@/Interfaces/response";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Pagination from "@/ui/layout/pagination";

export default function ItemList() {
  const { setCartCount, setCartCountList } = useCartStore();
  const { data: session, status } = useSession();
  const params = useParams<{ cate: string }>();
  const [items, setItems] = useState<any>();
  const [cart, setCart] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [search, setSearch] = useState<any>({
    search_text: "",
    page: 1,
  });

  const [showModalCheck, setShowModalCheck] = useState(false);
  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มตะกร้าสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const onAddCart = (data: any) => {
    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มตะกร้าไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setCart(data.cart_items);
    }
    setShowModalCheck(true);
  };

  const debounceTimer = useRef<any>(null);
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      
      const getItem = async () => {
        const res = await fetch(
          `/api/product/by-cate/${params.cate}?search_text=${search.search_text}`
        );
        const data = await res.json();

        if (data) {
          setItems(data);
          
        } else {
          setError(data.message);
          setStyle("text-[#DD0000]");
          setTitle("หมวดหมู่");
          setIcon(faCircleXmark);
          setShowModalCheck(true);
        }
      };
      getItem();
    }, 600);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  useEffect(() => {
    if (status !== "authenticated") return;

    const getCart = async () => {
      const res = await fetch("/api/cart/get");
      const data = await res.json();
      if (res.ok && data?.cart_items?.length) {
        setCart(JSON.parse(data.cart_items));
      }
    };

    getCart();
  }, [status]);

  useEffect(() => {
    const total_quantity = cart.reduce(
      (total, item: any) => total + item.quantity,
      0
    );
    setCartCount(total_quantity);
    setCartCountList(cart.length);
  }, [cart]);

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
        setItems(data_res);
      }
    };
    if (nextPage) {
      getItems();
      
    }
  }, [nextPage]);

  return (
    <>
      {items?.status !== false ? (
        <>
          <div className="flex justify-between mx-auto items-center gap-2">
            <div className="md:text-2xl sm:text-lg text-md font-semibold md:py-10 py-5">
              หมวดหมู่ : {items?.cate_name}
            </div>

            <div className="w-fit relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
              />

              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  autoComplete="off"
                  id="default-search"
                  className="w-full h-full pl-10 pr-5 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500 "
                  placeholder="ค้นหา"
                  aria-label="ค้นหา"
                  value={search.search_text}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      search_text: e.currentTarget.value,
                    })
                  }
                />
              </form>
            </div>
          </div>

          {items?.cate_data_paginate?.data?.length ? (
            <>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center pb-5">
                {items?.cate_data_paginate?.data.map(
                  (data: any, index: number) => {
                    return (
                      <OneItemList
                        key={index}
                        data={data}
                        cart={cart}
                        onConfirm={onAddCart}
                      />
                    );
                  }
                )}
              </div>
              <Pagination
                data={items.cate_data_paginate}
                setNextPage={setNextPage}
                search_paignation={null}
              />
            </>
          ) : items?.cate_data_paginate?.data?.length === 0 ? (
            <div className="md:text-2xl sm:text-lg text-md font-semibold py-2">
              ไม่มีวัสดุในหมวดหมู่นี้
            </div>
          ) : (
            <div className="md:text-2xl sm:text-lg text-md font-semibold py-2">
              กำลังโหลด ...
            </div>
          )}
        </>
      ) : (
        <div className="md:text-2xl sm:text-lg text-md font-semibold py-10">
          หมวดหมู่ : ไม่พบหมวดหมู่นี้
        </div>
      )}

      <ModalCheck
        show={showModalCheck}
        header="เพิ่มตะกร้า"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />
    </>
  );
}
