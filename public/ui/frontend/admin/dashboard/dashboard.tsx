"use client";
import { useRef, useState } from "react";
import StatusReport from "./inc/status-report";
import BookingNow from "./inc/table-booking-now";
import BookingOverdue from "./inc/table-booking-overdue";
import CategoryMostBooking from "./inc/table-category-most-booking";
import LessOutStock from "./inc/table-less-out-stock";
import ProductInuse from "./inc/table-product-inuse";
import ProductLoss from "./inc/table-product-loss";
import ProductMostBooking from "./inc/table-product-most-booking";
import TeacherApproveReject from "./inc/table-teacher-approve-reject";

export default function Dashboard() {
  const [serchDate, setSearchDate] = useState<Date | string>("all");
  return (
    <>
      <div className="py-5 text-[30px] font-bold">ภาพรวมข้อมูลของเว็บไซต์</div>
      {/* <div className="flex justify-end ">
        <span className="bg-gray-200 border border-gray-200 rounded p-2">
          รายงานประจำเดือน :{" "}
          <input
            type="date"
            className="focus:outline-none "
            placeholder="เลือกวันที่"
          />
        </span>
      </div> */}
      <StatusReport />
      <div className="grid grid-cols-2 gap-10 mb-5">
        <ProductMostBooking serchDate={serchDate} />
        <CategoryMostBooking serchDate={serchDate} />
        <LessOutStock serchDate={serchDate} />
        <ProductLoss serchDate={serchDate} />
      </div>
      <div className="flex flex-col gap-10 mb-10">
        <ProductInuse serchDate={serchDate} />
        <BookingNow serchDate={serchDate} />
        <BookingOverdue serchDate={serchDate} />
        <TeacherApproveReject serchDate={serchDate} />
      </div>
      {/* 
      ตารางแสดงวัสดุ ยืมบ่อยที่สุด = bar chart ** note: ไม่นับ 0 ครั้ง
      ตารางแสดงประเภท ยืมบ่อยที่สุด = pie chart เป็น %, donut chart เป็น จำนวนเต็ม ** note: ไม่นับ 0 ครั้ง
      ตารางแสดงวัสดุที่ใกล้หมดคลัง , หมดคลัง = bar chart *** ตรงนี้ต้อง check ว่าเคยถูกยืมด้วยดีมั้ยครับ
      ตารางแสดงของไม่ถูกส่งคืน (หาย) = table ชื่อวัสดุ ยืมโดย รหัสbooking ถูกยืมเมื่อ 
      ตารางแสดงวัสดุที่กำลังถูกใช้งาน =  table ชื่อวัสดุ ยืมโดย รหัสbooking ถูกยืมเมื่อ
      ตารางรายการคำขอล่าสุด พร้อมสถานะ = table
      ตารางแสดงรายการ อาจารย์แต่ละท่าน อนุมัติ / ปฏิเสธ กี่ครั้ง = Stacked Bar Chart, Grouped Bar Chart
       */}
    </>
  );
}
