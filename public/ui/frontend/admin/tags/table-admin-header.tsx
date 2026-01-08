"use client";
import ModalConfirm from "@/ui/layout/modal-confirm";
import TableAdminElement from "./inc/table-admin-element";
import { useState, useEffect, useRef } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/ui/layout/pagination";
import { Paginations } from "@/Interfaces/products";
import { Transition } from "@headlessui/react";

import MenuQuery from "./menu-query";
interface search {
  search_text: string;
  pagination: number;
}

export default function TableItemAdmin() {
  const [items, setItems] = useState<Paginations>();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("ลบTagสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const [idItem, setidItem] = useState(0);
  const [search, setSearch] = useState<search>({
    search_text: "",
    pagination: 10,
  });
  const [nextPage, setNextPage] = useState("");

  const debounceTimer = useRef<any>(null);
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      
      const getItem = async () => {
        const res = await fetch(
          `/medadm/api/tags/get?limit=${search.pagination}&search_text=${search.search_text}`
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
  }, [showModalCheck, search]);

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

  const handleDelete = async (e: any) => {
    setidItem(e.currentTarget.id);
    setShowModalConfirm(true);
  };

  const confirmDelete = async () => {
    
    const res = await fetch("/medadm/api/tags/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idItem }),
    });
    const data = await res.json();
    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("ลบTagไม่สำเร็จ");
      setIcon(faCircleXmark);
    }
    setShowModalConfirm(false);
    setShowModalCheck(true);
  };

  return (
    <>
      <MenuQuery
        count_items={items?.total ?? 0}
        onSearchChange={(newSearch: string) =>
          setSearch({ ...search, search_text: newSearch })
        }
      />
      {items && (
        <>
          <Transition
            appear
            show={true}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 absolute"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <table className="w-full text-sm text-left table-auto my-7">
              <thead className="text-base text-white font-medium bg-[#0055CAE5]">
                <tr>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 rounded-s-[8px]"
                  ></th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  ></th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    ชื่อTag
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    รายละเอียด
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2"
                  >
                    สถานะ
                  </th>
                  <th
                    scope="col"
                    className="sm:px-[5px] sm:py-[10px] px-4 py-2 sm:rounded-r-[8px]"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {items?.data.map((data: any, index: number) => (
                  <TableAdminElement
                    key={index}
                    index={items.from + index}
                    data={data}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </Transition>
          <Pagination
            data={items}
            setNextPage={setNextPage}
            search_paignation={(perpage: number) =>
              setSearch({ ...search, pagination: perpage })
            }
          />
        </>
      )}

      <ModalConfirm
        show={showModalConfirm}
        header="ลบรายการTag"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />

      <ModalCheck
        show={showModalCheck}
        header="เพิ่มTag"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />
    </>
  );
}
