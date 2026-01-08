"use client";
import { useEffect, useRef, useState } from "react";

import Pagination from "@/ui/layout/pagination";
import TableCoreConfigs from "./table-core-configs";
import Link from "next/link";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "@/ui/layout/modal-confirm";
import ModalCheck from "@/ui/layout/modal-check";
import { ApiResponse } from "@/Interfaces/response";
import { get } from "http";
interface search {
  search_text: string;
  pagination: number;
}

export default function CoreConfigsManagementPage() {
  const [coreConfigsData, setCoreConfigsData] = useState<any>();

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);
    const [response, setResponse] = useState<ApiResponse>({
      status: true,
      message: "",
    });
  

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("ลบการตั้งค่าสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);
  const [idItem, setidItem] = useState("");

  const getItems = async () => {
    const res = await fetch("/medadm/api/core-configs");
    if (!res.ok) return;
    const data = await res.json();
    setCoreConfigsData(data);
  };


  useEffect(() => {
    getItems();
  
  }, []);

  const handleDelete = async (id:string) => {
    setidItem(id);
    setShowModalConfirm(true);
  };

  // const confirmDelete = async () => {
  //   const res = await fetch(`/medadm/api/core-configs/${idItem}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
    

  //   if (!data.status) {
  //     setError(data.message);
  //     setStyle("text-[#DD0000]");
  //     setTitle("ลบการตั้งค่าไม่สำเร็จ");
  //     setIcon(faCircleXmark);
  //   }
  //   setResponse(data)
  //   setShowModalConfirm(false);
  //   setShowModalCheck(true);
  //   getItems()
  // };

  return (
    <div>
      {/* <Link
        href="setting-website/create"
        className="text-white text-sm font-medium bg-[#0B9BB5] hover:bg-[#0a7f93ff] p-[10px_20px] rounded-[10px]"
      >
        + เพิ่มการตั้งค่า
      </Link> */}
      <TableCoreConfigs coreConfigsData={coreConfigsData} onDelete={(id:string) => handleDelete(id)}/>
      {/* <ModalConfirm
        show={showModalConfirm}
        header="ลบการตั้งค่า"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />
      <ModalCheck
        show={showModalCheck}
        header="ลบการตั้งค่า"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      /> */}
    </div>
  );
}
