"use client";
import ModalCheck from "@/ui/layout/modal-check";
import ConFirmTable from "./confirm-page/confirm-table";
import {
  faChevronLeft,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'; 
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import Stepper from "@/ui/layout/status-state";
import ModalConfirm from "@/ui/layout/modal-confirm";
import BookingInfo from "../../component/booking-info";

export default function ConfirmPageElement() {
  const router = useRouter();
  const [titlePage, setTitlePage] = useState("");
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [itemsChange, setItemsChange] = useState<any>([]);
  const [remark, setRemark] = useState("");
  const [error_message, setError] = useState(
    "กรุณาตรวจสอบวัสดุ-อุปกรณ์ให้ครบถ้วน"
  );
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    
    const getItems = async () => {
      const res = await fetch("/api/booking-history/" + id);
      const data = await res.json();
      if (!data.status) {
        setError(data.message);
        setStyle("text-[#DD0000]");
        setTitle(`ไม่สามารถดูรายละเอียดการจองนี้ได้`);
        setIcon(faCircleXmark);
        setShowModal(true);
      } else {
        setItems(data);
      }
      
    };
    if (id) getItems();
  }, [id]);

  useEffect(() => {
    if (items?.status === "packed") {
      setTitlePage("ยืนยันรับของ");
    } else if (["inuse", "overdue", "incomplete"].includes(items?.status)) {
      setTitlePage("ยืนยันคืนของ");
    } else {
      setTitlePage("รายละเอียดการจอง");
    }
  }, [items]);

  const handleSubmit = async () => {
    const method = "PUT";

    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (method === "PUT") {
      options.body = JSON.stringify({
        item_booking_histories: itemsChange,
        remark: remark,
      });
    }

    const res = await fetch(
      `/api/booking-history/${
        items?.status == "packed" ? `packed/${id}` : `returned/${id}`
      }`,
      options
    );

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle(`${titlePage}ไม่สำเร็จ`);
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle(`${titlePage}สำเร็จ`);
      setIcon(faCircleCheck);
    }
    setShowModal(true);
  };

  return (
    <>
      {items && (
        <>
          <Link
            href="/booking-history"
            className="flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] md:text-base text-sm font-semibold mt-5"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>กลับ</p>
            <p>Booking History</p>
          </Link>
          <div className="font-bold md:text-[32px] text-2xl md:my-7 my-4">
            {titlePage}
          </div>

          {items && (
            <div
              className={
                items?.booking_status_histories?.length &&
                "flex md:flex-row flex-col md:gap-10 overflow-x-auto"
              }
            >
              <div className="md:flex-10/12">
                <BookingInfo items={items} />
                <ConFirmTable
                  list_items={items?.item_booking_histories}
                  ChangeStock={setItemsChange}
                  canUpdate={["inuse", "overdue", "incomplete"].includes(
                    items.status
                  )}
                />
                {["packed", "inuse", "overdue", "incomplete"].includes(
                  items.status
                ) ? (
                  <>
                    <Field as="div" className="mb-10">
                      <Label className="sm:text-lg text-base font-medium text-black">
                        หมายเหตุเพิ่มเติม
                      </Label>
                      <Textarea
                        name="description"
                        className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                        value={remark}
                        onChange={(e) => setRemark(e.currentTarget.value)}
                      />
                    </Field>
                    <button
                      type="button"
                      className="bg-[#6DBD70] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#5a9d5d] focus:outline-none focus:ring-2 focus:ring-[#4e8b51] w-full cursor-pointer"
                      onClick={() => setShowModalConfirm(true)}
                    >
                      บันทึกการ{titlePage}
                    </button>
                  </>
                ) : (
                  ""
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
        </>
      )}
      <ModalCheck
        show={showModal}
        header={titlePage}
        status_style={style}
        icon={icon}
        onClose={() => router.push("/booking-history")}
        title={title}
        des={error_message}
      />
      <ModalConfirm
        show={showModalConfirm}
        header={titlePage}
        description={`${titlePage}ใช่ หรือ ไม่`}
        onClose={() => setShowModalConfirm(false)}
        onConfirm={handleSubmit}
        style_button="text-white bg-[#6DBD70]"
      />
    </>
  );
}
