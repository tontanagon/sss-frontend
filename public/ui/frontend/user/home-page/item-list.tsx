"use client";
import OneItemList from "@/ui/frontend/user/home-page/inc/one-item-list";
import { useEffect, useRef, useState } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/store/cartStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@/ui/layout/pagination";

import { Paginations } from "@/Interfaces/products";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchParamsHandler } from "@/lib/setSearchParams";

export default function ItemList() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const { setSearchParams } = useSearchParamsHandler();
  const { setCartCount, setCartCountList } = useCartStore();
  const [items, setItems] = useState<Paginations>();
  const [cart, setCart] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [search, setSearch] = useState<any>({
    page: 1,
    search_text: "",
  });
  const [initialized, setInitialized] = useState(false);

  const [showModalCheck, setShowModalCheck] = useState(false);
  const [error_message, setError] = useState(
    "วัสดุ-อุปกรณ์ถูกเพิ่มลงตะกร้าสำเร็จ"
  );
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

  // const setSearchParams = (params_type: string, value: any) => {
  //   const currentParams = new URLSearchParams(window.location.search);

  //   if (params_type === "search_status") {
  //     currentParams.set("page", "1");
  //     currentParams.set(
  //       "search_status",
  //       encodeURIComponent(JSON.stringify(value))
  //     );
  //   } else if (params_type === "limit" || params_type === "search_text") {
  //     currentParams.set(params_type, value.toString());
  //     currentParams.set("page", "1");
  //   } else if (params_type === "page") {
  //     currentParams.set(params_type, value.toString());
  //   } else if (params_type === "all") {
  //     router.replace(window.location.pathname);
  //     return;
  //   }

  //   router.replace(`?${currentParams.toString()}`);
  // };

  const debounceTimer = useRef<any>(null);
  useEffect(() => {
    if (initialized) return;

    const page = searchParams.get("page");
    const search_text = searchParams.get("search_text");

    setSearch({
      page: page && Number(page) > 0 ? Number(page) : 1,
      search_text: search_text || "",
    });

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const getItem = async () => {
        const res = await fetch(
          `/api/product?page=${search.page}&search_text=${search.search_text}`
        );
        const data = await res.json();
        setItems(data);
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
    if (nextPage) {
      const params = new URLSearchParams(nextPage.split("?")[1]);
      const page = params.get("page");
      setSearch({ ...search, page: page ? Number(page) : 1 });
      setSearchParams("page", page);
      setNextPage("");
    }
  }, [nextPage]);

  return (
    <>
      <div className="flex justify-between items-center md:py-7 p-[25px_20px_15px_5px]">
        <div className="md:text-2xl sm:text-lg text-md font-semibold">
          วัสดุอุปกรณ์
        </div>
        <div className="w-fit relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
          />

          <input
            type="text"
            autoComplete="off"
            id="default-search"
            className="w-full pl-10 md:pr-10 pr-2 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="ค้นหา"
            aria-label="ค้นหา"
            value={search.search_text}
            onChange={(e) => {
              setSearch({
                ...search,
                page: 1,
                search_text: e.currentTarget.value,
              });
              setSearchParams("search_text", e.currentTarget.value);
            }}
          />
        </div>
      </div>

      {items?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">ไม่พบวัสดุ-อุปกรณ์</p>
        </div>
      )}

      {items && (
        <>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center pb-5">
            {items?.data.map((data: any, index) => {
              return (
                <OneItemList
                  key={index}
                  data={data}
                  cart={cart}
                  onConfirm={onAddCart}
                />
              );
            })}
          </div>
          <Pagination
            data={items}
            setNextPage={setNextPage}
            search_paignation={null}
          />
        </>
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
