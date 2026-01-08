import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import MenuTable from "./menu-table";

export default function TableAdminElement({
  data,
  onDelete,
  onEditStock,
}: {
  data: any;
  onDelete: any;
  onEditStock: any;
}) {
  return (
    <tr className=" bg-white border-b border-gray-200 text-[#1E1E1E] text-sm font-normal">
      <td className="sm:px-[5px] sm:py-[10px]">
        <div
          className={`w-[80px] h-[80px] ${data.image ? "relative" : "hidden"}`}
        >
          <Image
            src={data.image || "/images/no-picture.png"}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
        <div className={`${data.image ? "hidden" : "relative"}`}>
          ไม่มีรูปภาพ
        </div>
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2 whitespace-nowrap">
        {data.code}
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">{data.name}</td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
        {data.categories.map((category: any) => category.name).join(", ")}
      </td>

      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">{data.type.name}</td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">{data.unit || "-"}</td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
        <div className="flex flex-wrap items-center gap-6 w-fit">
          <p className="w-[30px] text-center">{data.stock}</p>
          <button
            type="button"
            id={data.id}
            value={data.stock}
            onClick={onEditStock}
            className="bg-[#0B9BB533] text-[#0B9BB5] px-3 py-1 rounded-[8px] cursor-pointer"
          >
            เพิ่ม-ลด
          </button>
        </div>
      </td>
      <td
        className={`sm:px-[5px] sm:py-[20px] px-4 py-2  ${
          data.status === "active" ? "text-[#4CAF50]" : "text-[#DD0000]"
        }`}
      >
        {data.status === "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
        {/* <div className="flex gap-3">
          <Link
            href={`products/edit/${data.id}`} 
            onNavigate={(e) => {
              
            }}
            className="bg-[#0B9BB533] text-[#0B9BB5] p-[5px_10px] rounded-[8px]"
          >
            <FontAwesomeIcon icon={faPenToSquare} /> แก้ไข
          </Link>
          <button
            type="button"
            id={data.id}
            onClick={onDelete}
            className="bg-[#F20D6C14] text-[#F20D6C] p-[5px_10px] rounded-[8px] cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div> */}
        <div className="flex gap-3">
          <MenuTable id={data.id} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}
