"use client";
import { BookingHistory } from "@/Interfaces/booking-history";
import { ApiResponse } from "@/Interfaces/response";
import ConFirmTable from "@/ui/frontend/admin/requests/confirm-page/confirm-table";
import ModalCheck from "@/ui/layout/modal-check";
import ModalConfirm from "@/ui/layout/modal-confirm";
import {
  faChevronLeft,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Label, Textarea } from "@headlessui/react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
// import StatusState from "../../../layout/status-state";
import ModalExtendDate from "./confirm-page/modal-extend-date";
import MenuStatus from "./inc/menu-status";
import Stepper from "../../../layout/status-state";
import BookingInfo from "../../component/booking-info";

interface StateStatus {
  status: string | null;
  name: string;
}

export default function ConfirmPageElement() {
  const router = useRouter();
  const search_path_status = useSearchParams().get("status");
  const { id } = useParams<{ id: string }>();

  const [items, setItems] = useState<BookingHistory>();
  const [showModalCheck, setShowModalCheck] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalExtend, setShowModalExtend] = useState(false);
  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false);

  const [response, setResponse] = useState<ApiResponse>();
  const [titlePage, setTitlePage] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState<StateStatus>({ status: "", name: "" });

  const [itemsChange, setItemsChange] = useState<any>([]);
  const [header, setHeader] = useState("");
  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const getItems = async () => {
    const res = await fetch("/medadm/api/requests/" + id);
    const data = await res.json();

    if (data.status != false) {
      setItems(data);
    } else {
      setError(data.message);
      setHeader(titlePage);
      setStyle("text-[#DD0000]");
      setTitle("ไม่สามารถยืนยันได้");
      setIcon(faCircleXmark);
      setShowModalCheck(true);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (items?.status === "pending") {
      setTitlePage("อนุมัติการจอง");
    } else if (items?.status === "approved") {
      setTitlePage("ยืนยันการจัดของ");
    } else if (items?.status === "returned") {
      setTitlePage("ยืนยันการคืนของ");
    } else {
      setTitlePage("รายละเอียดรายการคำขอ");
    }
  }, [items]);

  const handleSubmit = async (status: string | null = null) => {
    let url = `/medadm/api/requests/${items?.status}/${id}`;
    let options: RequestInit = { method: "GET" };

    if (status) {
      url = `/medadm/api/requests/${status}/${id}`;
      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remark: remark, items_change: itemsChange }),
      };
    }

    const res = await fetch(url, options);
    const data = await res.json();

    if (status === "incomplete") {
      if (!data.status) {
        setError(data.message);
        setHeader("ยืนยันการตีกลับ");
        setStyle("text-[#DD0000]");
        setTitle(`ตีกลับรายการไม่สำเร็จ`);
        setIcon(faCircleXmark);
      } else {
        setError(data.message);
        setHeader(titlePage);
        setStyle("text-[#4CAF50]");
        setHeader("ยืนยันการตีกลับ");
        setTitle(`ตีกลับรายการสำเร็จ`);
        setIcon(faCircleCheck);
      }
    } else {
      if (!data.status) {
        setError(data.message);
        setHeader(titlePage);
        setStyle("text-[#DD0000]");
        setTitle(`${titlePage}ไม่สำเร็จ`);
        setIcon(faCircleXmark);
      } else {
        setError(data.message);
        setHeader(titlePage);
        setStyle("text-[#4CAF50]");
        setTitle(`${titlePage}สำเร็จ`);
        setIcon(faCircleCheck);
      }
    }

    setResponse(data);
    setShowModalCheck(true);
  };

  const handleExtendDate = async (date: string) => {
    const res = await fetch(`/medadm/api/requests/extend-date`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        dateExtend: date,
      }),
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setHeader("ขยายเวลาการจอง");
      setStyle("text-[#DD0000]");
      setTitle(`ขยายเวลาการจองไม่สำเร็จ`);
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setHeader("ขยายเวลาการจอง");
      setTitle(`ขยายเวลาการจองสำเร็จ`);
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModalCheck(true);
  };

  const handleChangeStatus = async (status: string) => {
    const res = await fetch(`/medadm/api/requests/change-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        change_status_to: status,
      }),
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setHeader("เปลี่ยนสถานะ");
      setStyle("text-[#DD0000]");
      setTitle(`เปลี่ยนสถานะไม่สำเร็จ`);
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setHeader("เปลี่ยนสถานะ");
      setStyle("text-[#4CAF50]");
      setTitle(`เปลี่ยนสถานะสำเร็จ`);
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModalCheck(true);
  };

  const onSave = async () => {
    const res = await fetch(`/medadm/api/requests/save-change/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remark: remark,
        items_change: itemsChange,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      setHeader("บันทึกการเปลี่ยนแปลง");
      setStyle("text-[#DD0000]");
      setTitle(`บันทึกไม่สำเร็จ`);
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setHeader("บันทึกการเปลี่ยนแปลง");
      setStyle("text-[#4CAF50]");
      setTitle(`บันทึกสำเร็จ`);
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModalCheck(true);
  };
  const totalQuantity =
    itemsChange?.reduce(
      (sum: number, item: any) => sum + item.product_quantity,
      0
    ) ?? 0;
  return (
    <>
      {items && (
        <>
          <Link
            href={{
              pathname: "/medadm/requests",
              ...(search_path_status
                ? { query: { status: search_path_status } }
                : {}),
            }}
            className="flex items-center w-fit gap-2 text-[#264981] hover:text-[#0055ca] md:text-base text-sm font-semibold mt-5"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>กลับ</p>
            <p>รายการคำขอ</p>
          </Link>
          <div className="">
            <div className="font-bold md:text-[32px] text-2xl md:my-7 my-4">
              {titlePage}
            </div>

            <div className="flex justify-start gap-2 md:mb-3 mb-2">
              {items.status === "inuse" && (
                <button
                  type="button"
                  onClick={() => setShowModalExtend(true)}
                  className=" rounded p-1 border border-[#0055CA] text-white bg-[#0055CA] hover:text-[#0055CA] hover:bg-white cursor-pointer"
                >
                  เพิ่มเวลาการจอง
                </button>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-10 overflow-x-auto">
            <div className="md:flex-10/12">
              <BookingInfo items={items} />
              <ConFirmTable
                list_items={items?.item_booking_histories}
                canConfirm={items?.status}
                ChangeStock={(item: any) => setItemsChange(item)}
              />
              {["pending", "approved"].includes(items.status) ? (
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
                  <div className="flex md:gap-5 gap-3">
                    <button
                      type="button"
                      className="bg-[#6DBD70] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#5a9d5d] focus:outline-none focus:ring-2 focus:ring-[#4e8b51] w-full cursor-pointer disabled:cursor-default disabled:opacity-70 disabled:hover:bg-[#6DBD70]"
                      disabled={totalQuantity <= 0}
                      onClick={() => {
                        setStatus({ ...status, status: items.status });
                        setShowModalConfirm(true);
                        setHeader(titlePage);
                      }}
                    >
                      {totalQuantity > 0
                        ? titlePage
                        : "ไม่สามารถอนุมัติได้ เนื่องจากไม่มีรายการ"}
                    </button>
                    <button
                      type="button"
                      className="bg-[#0055CAE5] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#003f97e5] focus:outline-none focus:ring-2 w-full cursor-pointer"
                      onClick={() => {
                        onSave();
                      }}
                    >
                      บันทึกการเปลี่ยนแปลง
                    </button>
                  </div>
                  <div>
                    <strong>หมายเหตุ</strong>
                    <br /> • <strong>{titlePage}</strong> หมายถึง{" "}
                    {items.status === "pending"
                      ? "บันทึกการเปลี่ยนแปลง และ อนุมัติการจองแทนอาจารย์"
                      : "บันทึกการเปลี่ยนแปลง และ ยืนยันการจัดของ"}
                    <br />• <strong>บันทึกการเปลี่ยนแปลง</strong> หมายถึง
                    บันทึกการเปลี่ยนแปลงรายการวัสดุ
                  </div>
                </>
              ) : items.status === "returned" ? (
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
                  <div className="flex md:gap-5 gap-3">
                    <button
                      type="button"
                      className="bg-[#6DBD70] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#5a9d5d] focus:outline-none focus:ring-2 focus:ring-[#4e8b51] w-full cursor-pointer disabled:cursor-default disabled:opacity-70 disabled:hover:bg-[#6DBD70]"
                      onClick={() => {
                        setStatus({ ...status, status: items.status });
                        setShowModalConfirm(true);
                        setHeader(titlePage);
                      }}
                    >
                      {titlePage}
                    </button>

                    <button
                      type="button"
                      className="bg-[#DD0000] text-white text-base font-semibold rounded-[8px] px-8 md:px-24 py-[18px] mb-5 text-center hover:bg-[#c00000ff] focus:outline-none focus:ring-2 w-full cursor-pointer"
                      onClick={() => {
                        setStatus({ ...status, status: "incomplete" });
                        setShowModalConfirm(true);
                        setHeader("ตีกลับรายการ");
                      }}
                    >
                      ของไม่ครบ
                    </button>
                  </div>
                  <div>
                    <strong>หมายเหตุ</strong>
                    <br /> • <strong>ยืนยันการคืนของ</strong> หมายถึง
                    เสร็จสิ้นการยืม - คืน และคืนวัสดุเข้าคลังตามจำนวนที่คืน
                    <br />• <strong>ของไม่ครบ</strong> หมายถึง
                    ระบบจะส่งเรื่องไปให้นักศึกษา
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="md:flex-2/12">
              {!["reject", "completed"].includes(items.status) && (
                <MenuStatus
                  current_status={items.status}
                  onChangeStatus={(status: any) => {
                    setStatus(status);
                    setShowModalChangeStatus(true);
                  }}
                />
              )}
              <Stepper
                booking_status_histories={items.booking_status_histories}
              />
            </div>
          </div>
        </>
      )}
      <ModalExtendDate
        show={showModalExtend}
        date={items?.return_at}
        onClose={() => setShowModalExtend(false)}
        onSubmit={handleExtendDate}
      />
      <ModalConfirm
        show={showModalChangeStatus}
        header="เปลี่ยนสถานะ"
        description={`ยืนยันที่จะเปลี่ยนสถานะเป็น${status.name} ใช่ หรือ ไม่`}
        onClose={() => setShowModalChangeStatus(false)}
        onConfirm={() => handleChangeStatus(status.status || "")}
      />
      <ModalConfirm
        show={showModalConfirm}
        header={header}
        description={`${header} ใช่ หรือ ไม่`}
        onClose={() => setShowModalConfirm(false)}
        onConfirm={() => handleSubmit(status.status)}
        style_button="bg-[#6DBD70] text-white"
      />
      <ModalCheck
        show={showModalCheck}
        header={header}
        status_style={style}
        icon={icon}
        onClose={() => {
          response?.status ? router.push("/medadm/requests") : getItems();
          setShowModalCheck(false);
        }}
        title={title}
        des={error_message}
      />
    </>
  );
}
