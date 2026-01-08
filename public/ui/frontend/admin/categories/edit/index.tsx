"use client";
import FormInput from "@/ui/frontend/admin/categories/form-input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalCheck from "@/ui/layout/modal-check";
import { ApiResponse } from "@/Interfaces/response";
import { submitUpdateCategory } from "@/actions/admin/product-category-update";


export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();
  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขหมวดหมู่สำเร็จ");
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

    const data = await submitUpdateCategory(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขหมวดหมู่ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขหมวดหมู่สำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const [items, setItems] = useState();

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`/medadm/api/categories/get/${params.id}`);

      const data = await res.json();
      setItems(data);
    };
    getItem();
  }, []);

  return (
    <>
      {items && <FormInput data={items} onSubmit={handleSubmit} />}
      <ModalCheck
        show={showModal}
        header="แก้ไขหมวดหมู่"
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
