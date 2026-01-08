"use client";
import ModalCheck from "@/ui/layout/modal-check";
import { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "nextjs-toploader/app";
import { ApiResponse } from "@/Interfaces/response";
import { submitCreateTag } from "@/actions/admin/product-tag-create";

import FormInput from "@/ui/frontend/admin/tags/form-input";

export default function TagCreatePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มTagสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string;
      status: string;
      description: string;
    };

    const data = await submitCreateTag(formObject);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มTagไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มTagสำเร็จ");
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
        header="เพิ่มTag"
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
