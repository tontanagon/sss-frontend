"use client";
import FormInput from "@/ui/frontend/admin/products/form-input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalCheck from "@/ui/layout/modal-check";
import { ApiResponse } from "@/Interfaces/response";
import ModalEditStock from "@/ui/frontend/admin/products/inc/modal-edit-stock";
import { submitUpdateItem } from "@/actions/admin/product-items-update";
import { submitUpdateStockItem } from "@/actions/admin/product-items-stock-update";

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({
    status: true,
    message: "",
  });

  const [showModalEditStock, setShowModalEditStock] = useState(false);
  const [idItem, setidItem] = useState(0);
  const [itemsStock, setItemsStock] = useState(0);

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขวัสดุ-อุปกรณ์สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formObject = Object.fromEntries(formData.entries()) as {
      name: string;
      code: string;
      category: string;
      type_id: string;
      stock: string;
      status: string;
      description: string;
    };

    const data = await submitUpdateItem(formObject);
    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("แก้ไขวัสดุ-อุปกรณ์ไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("แก้ไขวัสดุ-อุปกรณ์สำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const [items, setItems] = useState<any>();

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(`/medadm/api/products/${params.id}`);
      const data = await res.json();
      setItems(data);
    };
    getItem();
  }, [showModalEditStock]);

  const handleEditStock = async (e: any) => {
    setidItem(e.currentTarget.id);
    setItemsStock(e.currentTarget.value);
    setShowModalEditStock(true);
  };

  const confirmEditStock = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const stock_change = Number(formData.get("stock") ?? 0);
    const description = formData.get("description")?.toString() ?? "";

    const formObject = {
      id: Number(idItem),
      before_stock: Number(itemsStock),
      after_stock: Number(itemsStock) + stock_change,
      stock_change: stock_change,
      description: description,
    };

    const data = await submitUpdateStockItem(formObject);

    if (data.status) {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("เพิ่ม-ลดจำนวนสำเร็จ");
      setIcon(faCircleCheck);
    } else {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("เพิ่ม-ลดจำนวนไม่สำเร็จ");
      setIcon(faCircleXmark);
    }
    setResponse({ status: false, message: "" });
    setShowModalEditStock(false);
    setShowModal(true);
  };
  return (
    <>
      {items && (
        <FormInput
          data={items}
          setCheckNullModal={""}
          onSubmit={handleSubmit}
          onEditStock={handleEditStock}
        />
      )}

      <ModalCheck
        show={showModal}
        header="แก้ไขวัสดุ-อุปกรณ์"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status ? () => setShowModal(false) : () => router.back()
        }
        title={title}
        des={error_message}
      />

      <ModalEditStock
        show={showModalEditStock}
        stock={itemsStock}
        onClose={() => setShowModalEditStock(false)}
        onSubmit={confirmEditStock}
      />
    </>
  );
}
