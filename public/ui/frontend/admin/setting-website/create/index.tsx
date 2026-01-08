"use client";
import { useEffect, useState } from "react";


import ModalCheck from "@/ui/layout/modal-check";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormCoreConfigs from "../../form/core-configs";
import { ApiResponse } from "@/Interfaces/response";
import { useRouter } from 'nextjs-toploader/app'; 
import { submitCreateCoreConfigs } from "@/actions/admin/core-configs/create";

export default function CreateCoreConfigsPage() {
  const router = useRouter();
  const [showModalCheck, setShowModalCheck] = useState(false);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string | null;
      code: string;
      link: string | null;
      cover: File | null;
      title: string | null;
      description: string | null;
      content: string | null;
      group: string | null;
      category: string | null;
      status: string;
    };

    const data = await submitCreateCoreConfigs(formObject);

    

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่มการตั้งค่าเว็บไซต์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่มการตั้งค่าเว็บไซต์สำเร็จ");
      setIcon(faCircleCheck);
    }
    setShowModalCheck(true);
    setResponse(data);
  };

  return (
    <div className="flex">
      <FormCoreConfigs
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSave(e)}
        className="basis-3/4"
      />

      <ModalCheck
        show={showModalCheck}
        header="จัดการเว็บไซต์"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModalCheck(false)
            : () => router.push("/medadm/setting-website")
        }
        title={title}
        des={error_message}
      />
    </div>
  );
}
