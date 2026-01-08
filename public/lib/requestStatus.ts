import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export type BookingStatus =
  | "pending"
  | "approved"
  | "packed"
  | "inuse"
  | "returned"
  | "completed"
  | "incomplete"
  | "overdue"
  | "reject";

export const style_status_class: Record<
  BookingStatus,
  {
    style_status: string;
    name_status: string;
    style_button: string;
    text: string;
    icon: IconDefinition;
  }
> = {
  pending: {
    style_status: "text-[#FCB500] bg-[#FCB5001A]",
    name_status: "รออนุมัติ",
    style_button: "bg-[#D9D9D9] text-white pointer-events-none",
    text: "ยืนยันรับของ",
    icon: faPenToSquare,
  },
  approved: {
    style_status: "text-[#4CAF50] bg-[#EEF7EE]",
    name_status: "อนุมัติ",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ยืนยันรับของ",
    icon: faPenToSquare,
  },
  packed: {
    style_status: "text-[#9C27B0] bg-[#F3E5F5]",
    name_status: "จัดของเสร็จสิ้น",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ยืนยันรับของ",
    icon: faPenToSquare,
  },
  inuse: {
    style_status: "text-[#3FB0D9] bg-[#3FB0D91A]",
    name_status: "กำลังใช้งาน",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ยืนยันคืนของ",
    icon: faPenToSquare,
  },
  returned: {
    style_status: "text-[#F20D6C] bg-[#F20D614]",
    name_status: "รอตรวจสอบการคืน",
    style_button: "text-[#0B9BB5] hover:bg-gray-200 cursor-pointer",
    text: "ดาวโหลด",
    icon: faPenToSquare,
  },
  completed: {
    style_status: "text-[#2E7D32] bg-[#E8F5E9]",
    name_status: "คืนสำเร็จ",
    style_button: "text-[#0B9BB5] hover:bg-gray-200 cursor-pointer",
    text: "ดาวโหลด",
    icon: faPenToSquare,
  },
  incomplete: {
    style_status: "text-[#757575] bg-[#F5F5F5]",
    name_status: "ของไม่ครบ",
    style_button: "text-[#0B9BB5] hover:bg-gray-200 cursor-pointer",
    text: "ดาวโหลด",
    icon: faPenToSquare,
  },
  overdue: {
    style_status: "text-[#DD0000] bg-[#FFEBEE]",
    name_status: "เกินกำหนดคืน",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ยืนยันคืนของ",
    icon: faPenToSquare,
  },
  reject: {
    style_status: "text-[#B71C1C] bg-[#FFEBEE]",
    name_status: "ยกเลิก",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ยืนยันคืนของ",
    icon: faPenToSquare,
  },
};
