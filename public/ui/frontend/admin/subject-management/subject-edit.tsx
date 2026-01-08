"use client";
import { useEffect, useState } from "react";

import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormSubject from "./inc/form";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import { ApiResponse } from "@/Interfaces/response";

export default function EditSubjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [items, setItems] = useState<any>();

  const getItems = async () => {
    
    const res = await fetch(`/medadm/api/subject/${id}`);

    if (!res.ok) return 
    const data = await res.json();
    setItems(data);
    
  };

  useEffect(() => {
    getItems();
  }, []);

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);

    const res = await fetch(`/medadm/api/subject/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขกระบวนวิชาไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขกระบวนวิชาสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModalCheck(true);
  };

  return (
    <div className="flex">
      {items && (
        <FormSubject
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSave(e)}
          data={items}
        />
      )}
      <ModalCheck
        show={showModalCheck}
        header="จัดการกระบวนวิชา"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModalCheck(false)
            : () => router.push("/medadm/subject-management")
        }
        title={title}
        des={error_message}
      />
    </div>
  );
}
