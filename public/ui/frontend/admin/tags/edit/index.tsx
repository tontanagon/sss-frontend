"use client";
import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalCheck from "@/ui/layout/modal-check";
import { ApiResponse } from "@/Interfaces/response";
import { submitUpdateTag } from "@/actions/admin/product-tag-update";

import FormInput from "@/ui/frontend/admin/tags/form-input";

export default function TagEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขTagสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string;
      status: string;
      description: string;
    };

    const data = await submitUpdateTag(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขTagไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขTagสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const [items, setItems] = useState<any>();
  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`/medadm/api/tags/get/${params.id}`);
      const data = await res.json();
      if (!data?.status) {
        setError(data.message);
        setStyle("text-[#DD0000]");
        setTitle("แก้ไขTagไม่สำเร็จ");
        setIcon(faCircleXmark);
        setShowModal(true);
      } else {
        setItems(data);
      }
    };
    getItem();
  }, []);

  return (
    <>
      {items && <FormInput data={items} onSubmit={handleSubmit} />}
      <ModalCheck
        show={showModal}
        header="แก้ไขTag"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medadm/tags")
        }
        title={title}
        des={error_message}
      />
    </>
  );
}
