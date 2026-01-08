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
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [idItem, setidItem] = useState(0);

  useEffect(() => {
    

    const getItem = async () => {
      const res = await fetch("/medadm/api/user-manager/user/get");
      const data = await res.json();
      setItems(data);
    };
    getItem();
    
  }, [showModalCheck]);

  const handleDelete = async (e: any) => {
    setidItem(e.currentTarget.id);
    setShowModalConfirm(true);
  };

  const confirmDelete = async () => {
    
    const res = await fetch("/medadm/api/user-manager/user/delete", {
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
      setTitle("ลบผู้ใช้งานไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("ลบผู้ใช้งานสำเร็จ");
      setIcon(faCircleCheck);
    }
    setShowModalConfirm(false);
    setShowModalCheck(true);
  };
  
  return (
    <>
      {items && (
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
                ชื่อผู้ใช้
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                ประเภทการเข้าใช้งาน
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                อีเมล
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
                onDelete={handleDelete}
                index={index}
                data={data}
              />
            ))}
          </tbody>
        </table>
      )}

      <ModalConfirm
        show={showModalConfirm}
        header="ลบผู้ใช้งาน"
        description="ยืนยันที่จะลบใช่ หรือ ไม่"
        onClose={() => setShowModalConfirm(false)}
        onConfirm={confirmDelete}
      />
      <ModalCheck
        show={showModalCheck}
        header="ลบผู้ใช้งาน"
        status_style={style}
        icon={icon}
        onClose={() => setShowModalCheck(false)}
        title={title}
        des={error_message}
      />
    </>
  );
}
