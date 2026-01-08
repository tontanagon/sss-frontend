"use client";
import ModalConfirm from "@/ui/layout/modal-confirm";
import TableAdminElement from "./inc/table-admin-element";
import { useState, useEffect } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";


export default function TableItemAdmin() {
  const [items, setItems] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("ลบสิทธิ์สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const [idItem, setidItem] = useState(0);

  useEffect(() => {
    

    const getItem = async () => {
      const res = await fetch("/medadm/api/user-manager/role/get");
      const data = await res.json();
      setItems(data);
    };
    getItem();
    
  }, [showModalCheck == false]);

  const handleDelete = async (e: any) => {
    setidItem(e.currentTarget.id);
    setShowModalConfirm(true);
  };

  const confirmDelete = async () => {
    

    const res = await fetch("/medadm/api/user-manager/role/delete", {
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
      setTitle("ลบสิทธิ์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    }
    setShowModalConfirm(false);
    setShowModalCheck(true);
  };
  return (
    <>
      <table className="w-full text-sm text-left table-fixed my-7">
        <thead className="text-base text-white font-medium bg-[#0055CAE5]">
          <tr>
            <th
              scope="col"
              className="sm:px-[50px] sm:py-[10px] px-4 py-2 rounded-s-[8px]"
            >
              ที่
            </th>
            <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
              ชื่อสิทธิ์
            </th>
            <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
              สิทธิ์ที่ใช้งาน
            </th>
            <th
              scope="col"
              className="sm:px-[5px] sm:py-[10px] px-4 py-2 sm:rounded-r-[8px]"
            ></th>
          </tr>
        </thead>
        <tbody>
          {items.map((data: any, index: number) => (
            <TableAdminElement
              key={index}
              index={index}
              data={data}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      <ModalConfirm
        show={showModalConfirm}
        header="ลบสิทธิ์"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />
      
      <ModalCheck
        show={showModalCheck}
        header="ลบสิทธิ์"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />
    </>
  );
}
