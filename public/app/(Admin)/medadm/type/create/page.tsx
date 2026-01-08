"use client";
import FormInput from "@/ui/frontend/admin/types/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import { useState, useEffect } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'nextjs-toploader/app'; 

import { ApiResponse } from "@/Interfaces/response";
import { submitCreateType } from "@/actions/admin/product-type-create";

export default function productCreatePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({status:true , message:''});

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มประเภทสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
          name: string;
          status: string;
          description: string;
        };

    const data = await submitCreateType(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มประเภทไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มประเภทสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="px-3 py-7 text-[32px] font-bold">เพิ่มรายการ</div>
      <FormInput data="" onSubmit={handleSubmit} />

      <ModalCheck
        show={showModal}
        header="เพิ่มประเภท"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medadm/types")
        }
        title={title}
        des={error_message}
      />
    </div>
  );
}
