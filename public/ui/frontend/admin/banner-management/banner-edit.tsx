"use client";
import { useEffect, useState } from "react";

import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormBanner from "./inc/form";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import { ApiResponse } from "@/Interfaces/response";

export default function EditBannerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [items, setItems] = useState<any>();

  const getItems = async () => {
    const res = await fetch(`/medadm/api/banner/${id}`);
    

    if (!res.ok) return;
    const data = await res.json();
    setItems(data);
    
  };

  useEffect(() => {
    getItems();
  }, []);

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);

    const res = await fetch(`/medadm/api/banner/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไข Banner ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไข Banner สำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data)
    setShowModalCheck(true);
  };

  return (
    <div className="flex">
      <FormBanner
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSave(e)}
        data={items}
      />
      <ModalCheck
        show={showModalCheck}
        header="จัดการ Banner"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModalCheck(false)
            : () => router.push("/medadm/banner-management")
        }
        title={title}
        des={error_message}
      />
    </div>
  );
}
