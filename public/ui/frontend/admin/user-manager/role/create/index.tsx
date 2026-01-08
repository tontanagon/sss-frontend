"use client";
import FormInput from "@/ui/frontend/admin/user-manager/role/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'nextjs-toploader/app'; 
import { ApiResponse } from "@/Interfaces/response";

export default function RoleCreatePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("เพิ่มสิทธิ์สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/medadm/api/user-manager/role/create", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        permissions: formData.get("permissions"),
      }),
    });

    const data = await res.json();
    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มสิทธิ์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มสิทธิ์สำเร็จ");
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
        header="เพิ่มสิทธิ์"
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
