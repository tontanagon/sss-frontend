"use client";
import { BookingHistory } from "@/Interfaces/booking-history";
import { ApiResponse } from "@/Interfaces/response";
import BookingInfo from "@/ui/frontend/component/booking-info";
import ConFirmTable from "@/ui/frontend/teacher/confirm-page/confirm-table";
// import FormConFirm from "@/ui/frontend/teacher/confirm-page/form-confirm";
import ModalReject from "@/ui/frontend/teacher/confirm-page/modal-reject";
// import FormConFirm from "@/ui/frontend/user/booking-history-page/confirm-page/form-confirm";
import ModalCheck from "@/ui/layout/modal-check";
import ModalConfirm from "@/ui/layout/modal-confirm";
import Stepper from "@/ui/layout/status-state";
import {
  faChevronLeft,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Label, Textarea } from "@headlessui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<BookingHistory | null>(null);
  const [itemsChange, setItemsChange] = useState<any>([]);
  const [remark, setRemark] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("/medtch/api/approve-list/" + id);
      const data = await res.json();

      if (data.status === true) {
        setError(data.message);
        setStyle("text-[#DD0000]");
        setTitle("ไม่มีรายการรออนุมัติ");
        setIcon(faCircleXmark);
        setResponse(data);
        setShowModal(true);
      } else {
        setItems(data);
      }
    };
    if (id) getItems();
  }, [id]);

  const onApprove = async () => {
    // const isChange = itemsChange.filter(
    //   (item: any) => item.product_quantity != item.product_quantity_return
    // );

    const res = await fetch("/medtch/api/approve", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        items_change: itemsChange,
        remark: remark,
      }),
    });
    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("อนุมัติการจองไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("อนุมัติการจองสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const onReject = async (remark: string) => {
    const res = await fetch("/medtch/api/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, remark: remark }),
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("ยกเลิกการจองไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("ยกเลิกการจอง");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  const totalQuantity =
    itemsChange?.reduce(
      (sum: number, item: any) => sum + item.product_quantity,
      0
    ) ?? 0;

  return (
    <>
      <div className="font-bold md:text-[32px] text-2xl md:my-7 my-4">
        {items?.status === "pending" ? "อนุมัติการจอง" : "ประวัติการอนุมัติ"}
      </div>

      {items && (
        <div className={"flex md:flex-row flex-col md:gap-10 overflow-x-auto"}>
          <div className="md:flex-10/12">
            <BookingInfo items={items} />
            <ConFirmTable
              list_items={items.item_booking_histories}
              ChangeStock={setItemsChange}
              canUpdate={items.status === "pending"}
            />
            {items.status === "pending" ? (
              <>
                <Field as="div" className="mb-10">
                  <Label className="sm:text-lg text-base font-medium text-black">
                    หมายเหตุ
                  </Label>
                  <Textarea
                    name="description"
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                    value={remark}
                    onChange={(e) => setRemark(e.currentTarget.value)}
                  />
                </Field>
                <div className="flex gap-5">
                  <button
                    type="button"
                    className="bg-[#6DBD70] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#5a9d5d] focus:outline-none focus:ring-2 focus:ring-[#4e8b51] w-full cursor-pointer disabled:cursor-default disabled:opacity-70 disabled:hover:bg-[#6DBD70]"
                    disabled={totalQuantity <= 0}
                    onClick={() => setShowModalConfirm(true)}
                  >
                    {totalQuantity <= 0
                      ? "ไม่สามารถอนุมัติได้ เนื่องจากไม่มีรายการ"
                      : "อนุมัติการจอง"}
                  </button>

                  <button
                    type="button"
                    className="bg-[#DD0000] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#c00000ff] focus:outline-none focus:ring-2 focus:ring-[#9c0202] w-full cursor-pointer"
                    onClick={() => setShowModalReject(true)}
                  >
                    ยกเลิกการจอง
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {items?.booking_status_histories && (
            <div className="md:flex-2/12">
              <Stepper
                booking_status_histories={items.booking_status_histories}
              />
            </div>
          )}
        </div>
      )}

      <ModalReject
        show={showModalReject}
        onClose={() => setShowModalReject(false)}
        onSubmit={(remark: string) => onReject(remark)}
      />

      <ModalCheck
        show={showModal}
        header="รายการอนุมัติ"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/medtch")
        }
        title={title}
        des={error_message}
      />
      <ModalConfirm
        show={showModalConfirm}
        header={`ยืนยันการอนุมัติ`}
        description={`ยืนยันที่จะอนุมัติใช่ หรือ ไม่`}
        onClose={() => setShowModalConfirm(false)}
        onConfirm={() => onApprove()}
        style_button="bg-[#6DBD70] text-white"
      />
    </>
  );
}
