"use client";
import FormInput from "@/ui/frontend/admin/user-manager/role/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import { useState, useEffect } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { ApiResponse } from "@/Interfaces/response";

export default function RoleEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขสิทธิ์สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/medadm/api/user-manager/role/update", {
      method: "POST",
      body: JSON.stringify({
        id: formData.get("id"),
        name: formData.get("name"),
        permissions: formData.get("permissions"),
      }),
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขสิทธิ์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขสิทธิ์สำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const [items, setItems] = useState();

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`/medadm/api/user-manager/role/get/${params.id}`);

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
        header="แก้ไขสิทธิ์"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medadm/roles")
        }
        title={title}
        des={error_message}
      />
    </>
  );
}
