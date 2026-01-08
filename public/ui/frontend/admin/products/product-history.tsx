"use client";

import { Items } from "@/Interfaces/products";
import { formatDateToThai } from "@/lib/changeDateToThai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

export interface StockHistory {
  product_info: Items;
  product_history: productHistory[];
}

export interface productHistory {
  type: string;
  add_type: string;
  user_name: string;
  booking_id?: number;
  booking_number?: string;
  before_stock: number;
  after_stock: number;
  created_at: string;
}

interface InfoBoxProps {
  title: string;
  value: React.ReactNode;
  className?: string;
}

export default function HistoryProductTable() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<StockHistory>();

  const getProduct = async () => {
    const res = await fetch(`/medadm/api/products/stock/${params.id}`);

    if (!res.ok) return;

    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const InfoBox: React.FC<InfoBoxProps> = ({ title, value, className }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="text-gray-600 text-sm font-medium ">{title}</div>
      <div className="sm:text-base text-sm text-[#1E1E1E] font-normal w-full bg-gray-50 border border-[#E0E0E0] rounded-xl px-5 py-3 ">
        {value || <span className="text-gray-400 italic">- ไม่มีข้อมูล -</span>}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex gap-10">
        <img
          src={product?.product_info.image}
          className="basis-2/12 object-contain w-50 h-50"
        />
        <div className="basis-10/12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          <InfoBox title="ชื่อวัสดุ" value={product?.product_info.name} />
          <InfoBox title="รหัสวัสดุ" value={product?.product_info.code} />
          <InfoBox
            title="หมวดหมู่"
            value={product?.product_info.category}
            className="md:col-span-2"
          />
          <InfoBox title="ประเภท" value={product?.product_info.type} />
          <InfoBox
            title="จำนวนคลังตอนนี้"
            value={`${product?.product_info.stock} ${
              product?.product_info.unit || "หน่วย"
            }`}
          />
          <InfoBox
            title="สถานะ"
            value={
              product?.product_info.status === "active"
                ? "ใช้งาน"
                : "ไม่ได้ใช้งาน"
            }
          />
          <InfoBox
            title="เปลี่ยนแปลงล่าสุดเมื่อ"
            value={formatDateToThai(product?.product_info?.updated_at!!)}
          />
        </div>
      </div>
      <table className="table-fixed w-full md:mt-6 mt-3 mb-3">
        <thead className={`text-white text-lg font-medium bg-[#0055CAE5]`}>
          <tr className="md:text-[0.8em] text-[0.7em]">
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-s-[8px] text-start">
              ประเภท
            </th>
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
              ลักษณะการเพิ่ม/ลด
            </th>
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-end w-40">
              จำนวนที่เปลี่ยน
            </th>
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
              เปลี่ยนแปลงโดย
            </th>
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 text-start">
              หมายเลขการจอง
            </th>

            <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-r-[8px] text-start">
              วันที่เปลี่ยนแปลง
            </th>
          </tr>
        </thead>
        <tbody>
          {product?.product_history && product?.product_history.length > 0 ? (
            product?.product_history.map(
              (booking: productHistory, index: number) => {
                return (
                  <tr
                    key={index}
                    className={`bg-white border-b border-gray-200 md:text-[0.8em] text-[0.7em]`}
                  >
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.add_type}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.type === "increase" ? "เพิ่ม" : "ลด"}
                    </td>
                    <td className="text-end md:px-[20px] md:py-[10px] px-2 py-1">
                      {Math.abs(booking.before_stock - booking.after_stock)}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking.user_name}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {booking?.booking_number ? (
                        <Link
                          href={`/medadm/requests/${booking?.booking_id}`}
                          className="text-[#0054cab5] underline underline-offset-2 hover:text-[#0054ca]"
                        >
                          {booking.booking_number}
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="text-left md:px-[20px] md:py-[10px] px-2 py-1">
                      {formatDateToThai(booking.created_at)}
                    </td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 py-5 font-medium"
              >
                ไม่พบข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
