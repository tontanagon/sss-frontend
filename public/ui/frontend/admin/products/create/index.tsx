"use client";
import { submitCreateItem } from "@/actions/admin/product-items-create";
import FormInput from "@/ui/frontend/admin/products/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

export default function ProductCreatePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(true);
  const [checkNullModal, setCheckNullModal] = useState(false);
  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มวัสดุ-อุปกรณ์สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  useEffect(() => {
    if (checkNullModal) {
      setError("กรุณาเพิ่มหมวดหมู่ และ ประเภทก่อน");
      setStyle("text-[#DD0000]");
      setTitle("ไม่สามารถเพิ่มได้");
      setIcon(faXmarkCircle);
      setShowModal(true);
    }
  }, [checkNullModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string;
      code: string;
      category: string;
      image: File;
      type_id: string;
      stock: string;
      status: string;
      description: string;
    };

    const data = await submitCreateItem(formObject);

    if (data.status) {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มวัสดุ-อุปกรณ์สำเร็จ");
      setIcon(faCircleCheck);
    } else {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มวัสดุ-อุปกรณ์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    }
    setResponse(data.status);
    setShowModal(true);
  };

  return (
    <>
      <FormInput
        data=""
        setCheckNullModal={setCheckNullModal}
        onSubmit={handleSubmit}
        onEditStock={null}
      />

      <ModalCheck
        show={showModal}
        header="เพิ่มวัสดุ-อุปกรณ์"
        status_style={style}
        icon={icon}
        onClose={response ? () => router.back() : () => setShowModal(false)}
        title={title}
        des={error_message}
      />
    </>
  );
}
