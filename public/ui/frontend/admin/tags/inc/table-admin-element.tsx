import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


export default function TableAdminElement({
  data,
  index,
  onDelete,
}: {
  data: any;
  index: number;
  onDelete: any;
}) {
  return (
    <tr className=" bg-white border-b border-gray-200 text-[#1E1E1E] text-sm font-normal">
      <td className="sm:px-[5px] sm:py-[10px]">
        {/* <div className="relative w-[80px] h-[80px]">
          <Image
            src={data.images}
            alt="image"
            fill
            className="object-contain"
          />
        </div> */}
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2 whitespace-nowrap">
        {index}
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">{data.name}</td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
        {data.description || "-"}
      </td>
      <td
        className={`sm:px-[5px] sm:py-[20px] px-4 py-2  ${
          data.status === "active" ? "text-[#4CAF50]" : "text-[#DD0000]"
        }`}
      >
        {data.status === "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
      </td>
      <td className="sm:px-[5px] sm:py-[20px] px-4 py-2 text-end">
        <div className="flex gap-3 justify-center">
          <Link
            href={`tags/edit/${data.id}`}
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
        </div>
      </td>
    </tr>
  );
}
