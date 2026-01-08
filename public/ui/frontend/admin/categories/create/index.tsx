"use client";
import FormInput from "@/ui/frontend/admin/categories/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "nextjs-toploader/app";
import { ApiResponse } from "@/Interfaces/response";
import { submitCreateCategory } from "@/actions/admin/product-category-create";

export default function CategoryCreatePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มหมวดหมู่สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      id: string;
      name: string;
      image: File;
      image_old_path: string;
      type_id: string;
      status: string;
      description: string;
    };

    const data = await submitCreateCategory(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มหมวดหมู่ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มหมวดหมู่สำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  return (
    <>
      <FormInput data="" onSubmit={handleSubmit} />
      <ModalCheck
        show={showModal}
        header="เพิ่มหมวดหมู่"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medadm/categories")
        }
        title={title}
        des={error_message}
      />
    </>
  );
}
