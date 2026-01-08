"use client";
import FormInput from "@/ui/frontend/admin/types/form-input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalCheck from "@/ui/layout/modal-check";
import { ApiResponse } from "@/Interfaces/response";
import { submitUpdateType } from "@/actions/admin/product-type-update";

export default function categoryEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขประเภทสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string;
      status: string;
      description: string;
    };

    const data = await submitUpdateType(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขประเภทไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขประเภทสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const [items, setItems] = useState();
  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`/medadm/api/types/get/${params.id}`);
      const data = await res.json();
      setItems(data);
    };
    getItem();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="px-3 py-10 text-[32px] font-bold">แก้ไขรายการ</div>
        {items && <FormInput data={items} onSubmit={handleSubmit} />}
      </div>

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
    </>
  );
}
