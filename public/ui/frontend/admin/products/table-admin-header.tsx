"use client";
import ModalConfirm from "@/ui/layout/modal-confirm";
import TableAdminElement from "./inc/table-admin-element";
import { Fragment, useState, useEffect, useRef, use } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalEditStock from "./inc/modal-edit-stock";
import { submitUpdateStockItem } from "@/actions/admin/product-items-stock-update";
import MenuQuery from "./menu-query";
import Pagination from "@/ui/layout/pagination";
import { Paginations } from "@/Interfaces/products";
import { Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

export default function TableItemAdmin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const debounceTimer = useRef<any>(null);

  const [items, setItems] = useState<Paginations>();
  const [itemsStock, setItemsStock] = useState(0);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [showModalEditStock, setShowModalEditStock] = useState(false);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("ลบรายการวัสดุ");
  const [icon, setIcon] = useState(faCircleCheck);
  const [idItem, setidItem] = useState(0);
  const [initialized, setInitialized] = useState(false);

  type SearchStatus = {
    category: number[];
    type: number[];
  };

  const [search, setSearch] = useState<{
    page: number;
    pagination: number;
    search_text: string;
    search_status: SearchStatus;
  }>({
    page: 1,
    pagination: 10,
    search_text: "",
    search_status: { category: [], type: [] },
  });

  const [nextPage, setNextPage] = useState("");

  // useEffect(() => {
  //   if (!initialized) return;
  //   if (search.pagination) {
  //     setSearchParams("limit", Number(search.pagination));
  //   }
  // }, [search.pagination]);

  useEffect(() => {
    if (initialized) return;

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const search_text = searchParams.get("search_text");
    const rawSearchStatus = searchParams.get("search_status") || "{}";

    const searchStatusSchema = z.object({
      category: z.array(z.number()).default([]),
      type: z.array(z.number()).default([]),
    });

    let parsedStatus;
    try {
      parsedStatus = searchStatusSchema.parse(
        JSON.parse(decodeURIComponent(rawSearchStatus))
      );
    } catch (error) {
      console.warn("Invalid search_status in URL, fallback to default", error);
      parsedStatus = searchStatusSchema.parse({});
    }

    setSearch({
      page: page && Number(page) > 0 ? Number(page) : 1,
      pagination: limit && Number(limit) > 0 ? Number(limit) : 10,
      search_text: search_text || "",
      search_status: parsedStatus,
    });

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      const search_status = JSON.stringify(search.search_status);

      const response = await fetch(
        `/medadm/api/products?limit=${search.pagination}&page=${
          search.page
        }&search_text=${search.search_text}&search_status=${encodeURIComponent(
          search_status
        )}`
      );

      const data = await response.json();

      setItems(data);
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [search, showModalCheck]);

  useEffect(() => {
    if (nextPage) {
      const params = new URLSearchParams(nextPage.split("?")[1]);
      const page = params.get("page");
      setSearchParams("page", Number(page));
      setSearch({ ...search, page: page ? Number(page) : 1 });
      setNextPage("");
    }
  }, [nextPage]);

  const handleEditStock = async (e: any) => {
    setidItem(e.currentTarget.id);
    setItemsStock(e.currentTarget.value);
    setShowModalEditStock(true);
  };

  const confirmEditStock = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const stock_change = Number(formData.get("stock") ?? 0);
    const description = formData.get("description")?.toString() ?? "";

    const formObject = {
      id: Number(idItem),
      before_stock: Number(itemsStock),
      after_stock: Number(itemsStock) + stock_change,
      stock_change: stock_change,
      description: description,
    };

    const data = await submitUpdateStockItem(formObject);
    setHeader("เพิ่ม-ลดจำนวน");
    if (data.status) {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่ม-ลดจำนวนสำเร็จ");
      setIcon(faCircleCheck);
    } else {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่ม-ลดจำนวนสำเร็จ");
      setIcon(faCircleXmark);
    }
    setShowModalEditStock(false);
    setShowModalCheck(true);
  };

  const handleDelete = async (id: any) => {
    setidItem(id);
    setShowModalConfirm(true);
  };

  const confirmDelete = async () => {
    const res = await fetch(`/medadm/api/products/${idItem}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("ลบรายการวัสดุไม่สำเร็จ");
      setHeader("ลบรายการวัสดุ");
      setIcon(faCircleXmark);
    }
    setError(data.message);
    setShowModalConfirm(false);
    setShowModalCheck(true);
  };

  const setSearchParams = (params_type: string, value: any) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (params_type === "search_status") {
      currentParams.set("page", "1");
      currentParams.set(
        "search_status",
        encodeURIComponent(JSON.stringify(value))
      );
    } else if (params_type === "limit" || params_type === "search_text") {
      currentParams.set(params_type, value.toString());
      currentParams.set("page", "1");
    } else if (params_type === "page") {
      currentParams.set(params_type, value.toString());
    } else if (params_type === "all") {
      router.replace(window.location.pathname);
      return;
    }

    router.replace(`?${currentParams.toString()}`);
  };

  return (
    <>
      <MenuQuery
        count_items={items?.total ?? 0}
        setSearch={setSearch}
        search={search}
        setSearchParams={(params_type, value) =>
          setSearchParams(params_type, value)
        }
      />
      {items && (
        <>
          <Transition
            appear
            show={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500 absolute"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <table className="w-full text-sm text-left table-fixed my-7">
              <thead className="text-base text-white font-medium bg-[#0055CAE5]">
                <tr>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 rounded-s-[8px] w-40"
                  ></th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 w-30"
                  >
                    รหัส
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    รายการ
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    หมวดหมู่
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    ประเภท
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    {/* lg:table-cell md:hidden sm:hidden table-cell */}
                    หน่วย
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    จำนวน
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 w-20"
                  >
                    สถานะ
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 sm:rounded-r-[8px] w-20"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {items?.data.map((data: any, index: number) => (
                  <TableAdminElement
                    key={index}
                    data={data}
                    onEditStock={handleEditStock}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </Transition>

          <Pagination
            data={items}
            setNextPage={setNextPage}
            search_paignation={(perpage: number, page: number | undefined) => {
              setSearch((prev) => ({
                ...prev,
                ...(page && { page: page }),
                pagination: perpage,
              }));
              setSearchParams("limit", perpage);
            }}
          />
        </>
      )}
      <ModalConfirm
        show={showModalConfirm}
        header="ลบรายการวัสดุ"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />
      <ModalCheck
        show={showModalCheck}
        header={header}
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />

      <ModalEditStock
        show={showModalEditStock}
        stock={itemsStock}
        onClose={() => setShowModalEditStock(false)}
        onSubmit={confirmEditStock}
      />
    </>
  );
}
