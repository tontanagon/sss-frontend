"use client";
import { useEffect, useRef, useState } from "react";
import {
  CoreConfigs,
  CoreConfigsForm,
  PagenateCoreConfigs,
} from "@/Interfaces/core-configs";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import Image from "next/image";
import { circle_info } from "@/constants/asset-path";

import CoverUploadSection from "../form/cover";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
  faPenToSquare,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalConfirm from "@/ui/layout/modal-confirm";
import Pagination from "@/ui/layout/pagination";

interface search {
  search_text: string;
  pagination: number;
}

export default function BannerManagementPage() {
  const [onMount, setOnMount] = useState(true);

  const [showModalCheck, setShowModalCheck] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [items, setItems] = useState<PagenateCoreConfigs>();
  const [idItem, setidItem] = useState(0);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [nextPage, setNextPage] = useState("");

  const getItems = async () => {
    const res = await fetch(
      `/medadm/api/banner?limit=${search.pagination}&search_text=${search.search_text}`
    );
    

    if (!res.ok) return;
    const data = await res.json();
    setItems(data);
    
  };

  const [search, setSearch] = useState<search>({
    search_text: "",
    pagination: 10,
  });

  const debounceTimer = useRef<any>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (onMount) {
      getItems();
      setOnMount(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      getItems();
    }, 600);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

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
    
    const res = await fetch(`/medadm/api/banner/${idItem}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("ลบbannerไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setTitle("ลบ Banner สำเร็จ");
    }
    setShowModalConfirm(false);
    setShowModalCheck(true);
    getItems();
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Link
          href="banner-management/create"
          className="text-white text-sm font-medium bg-[#0B9BB5] hover:bg-[#0a7f93ff] p-[10px_20px] rounded-[10px]"
        >
          + เพิ่ม Banner
        </Link>
        <div>
          ทั้งหมด {items?.total ?? 0} รายการ
        </div>
        </div>
        <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white ">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
          />

          <input
            value={search.search_text}
            autoComplete="off"
            onChange={(e) =>
              setSearch({ ...search, search_text: e.target.value })
            }
            type="text"
            id="default-search"
            className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="ค้นหา"
            aria-label="ค้นหา"
          />
        </div>
      </div>
      <div className="overflow-y-auto md:my-5 my-2">
        <table className="table-fixed w-full mb-3">
          <thead className={`text-white font-medium bg-[#0055CAE5]`}>
            <tr className="md:text-[1rem] text-[0.8rem]">
              <th className="md:px-[20px] md:py-[10px] px-2 py-3 rounded-s-[8px] text-end md:w-25 w-15">
                ลำดับที่
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start md:w-80 w-15">
                ภาพพื้นหลัง
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                ชื่อ
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                หัวข้อ
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
                รายละเอียด
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start md:w-25 w-10">
                สถานะ
              </th>
              <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-r-[8px] text-start md:w-50 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items && items?.data.length > 0 ? (
              items?.data.map((banner: CoreConfigs, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`bg-white border-b border-gray-200 font-normal md:text-[0.9em] text-[0.8em]`}
                  >
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1 text-end">
                      {index + (items.from ?? 1)}
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      <img
                        src={banner?.cover ?? "/images/no-picture.png"}
                        className="aspect-64/25 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/images/no-picture.png";
                        }}
                      />
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      {banner.name}
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      {banner.title}
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      {banner.description}
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      {banner.status === "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
                    </td>
                    <td className=" md:px-[20px] md:py-[10px] px-2 py-1">
                      <div className="flex gap-3">
                        <Link
                          href={`banner-management/edit/${banner.id}`}
                          // onNavigate={() => {
                          //   
                          // }}
                          className="bg-[#0B9BB533] text-[#0B9BB5] p-[5px_10px] rounded-[8px]"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} /> แก้ไข
                        </Link>
                        <button
                          type="button"
                          id={String(banner.id)}
                          onClick={handleDelete}
                          className="bg-[#F20D6C14] text-[#F20D6C] p-[5px_10px] rounded-[8px] cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 py-5 font-medium"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          data={items}
          setNextPage={setNextPage}
          search_paignation={(perpage: number) =>
            setSearch({ ...search, pagination: perpage })
          }
        />
      </div>
      <ModalCheck
        show={showModalCheck}
        header="จัดการ Banner"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />
      <ModalConfirm
        show={showModalConfirm}
        header="ลบ Banner"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
