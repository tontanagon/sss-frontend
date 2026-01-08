"use client";
import FormInput from "@/ui/frontend/admin/user-manager/user/form-input";
import ModalCheck from "@/ui/layout/modal-check";
import { useState, useEffect } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ApiResponse } from "@/Interfaces/response";

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [items, setItems] = useState();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขผู้ใช้งานสำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/medadm/api/user-manager/user/update", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขผู้ใช้งานไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขผู้ใช้งานสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch(`/medadm/api/user-manager/user/get/${params.id}`);
      const data = await res.json();
      setItems(data);
    };
    getItems();
  }, []);

  return (
    <>
      {items && <FormInput data={items} onSubmit={handleSubmit} />}

      <ModalCheck
        show={showModal}
        header="แก้ไขผู้ใช้งาน"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medadm/users")
        }
        title={title}
        des={error_message}
      />
    </>
  );
}
