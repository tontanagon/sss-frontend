import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBox, faBoxOpen, faCheckToSlot, faClock, faClockRotateLeft, faFileCircleCheck, faFileCircleXmark, faFileText, faPenToSquare, faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

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
    sh_approve_by:string | null | undefined
    sh_icon:IconDefinition;
  }
> = {
  pending: {
    style_status: "text-[#FCB500] bg-[#FCB5001A]",
    name_status: "รออนุมัติ",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ทำรายการโดย',
    sh_icon:faFileText
  },
  approved: {
    style_status: "text-[#4CAF50] bg-[#EEF7EE]",
    name_status: "รอจัดของ",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'อนุมัติโดย',
    sh_icon:faFileCircleCheck
  },
  packed: {
    style_status: "text-[#9C27B0] bg-[#F3E5F5]",
    name_status: "จัดของเสร็จสิ้น",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'จัดของโดย',
    sh_icon:faBox
  },
  inuse: {
    style_status: "text-[#3FB0D9] bg-[#3FB0D91A]",
    name_status: "กำลังใช้งาน",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ยืนยันรับของโดย',
    sh_icon:faBoxOpen
  },
  returned: {
    style_status: "text-[#F20D6C] bg-[#F20D6C14]",
    name_status: "รอตรวจสอบการคืน",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ยืนยันคืนของโดย',
    sh_icon:faBox,
  },
  completed: {
    style_status: "text-[#2E7D32] bg-[#E8F5E9]",
    name_status: "คืนสำเร็จ",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ตรวจสอบโดย',
    sh_icon:faSquareCheck
  },
  incomplete: {
    style_status: "text-[#DD0000] bg-[#DD000014]",
    name_status: "ของไม่ครบ",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ตรวจสอบโดย',
    sh_icon:faSquareXmark
  },
  overdue: {
    style_status: "text-[#DD0000] bg-[#FFEBEE]",
    name_status: "เกินกำหนดคืน",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'เปลี่ยนสถานะโดย',
    sh_icon:faClockRotateLeft
  },
  reject: {
    style_status: "text-gray-500 bg-gray-100",
    name_status: "ยกเลิก",
    style_button: "bg-[#0B9BB5] text-white hover:bg-[#09798d] cursor-pointer",
    text: "ดูรายละเอียด",
    icon: faPenToSquare,
    sh_approve_by:'ยกเลิกโดย',
    sh_icon:faFileCircleXmark
  },
};
