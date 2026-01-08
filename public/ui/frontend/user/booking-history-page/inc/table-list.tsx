import { item_booking_histories } from "@/Interfaces/booking-history";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableList({ list }: { list: item_booking_histories }) {
  const category = JSON.parse(list.product_category);
  const isReceived = list.status === "received";
  const statusText = isReceived ? "ได้รับของแล้ว" : "ยังไม่ได้รับของ";
  const statusIcon = isReceived ? faCheck : faXmark;
  const statusClasses = isReceived
    ? "text-[#0B9BB5] bg-[#0B9CB51A]"
    : "bg-[#F5F5F5] text-[#888686]";

  return (
    <tr>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_name}</td>
      <td className="px-4 py-2 border border-[#DFDFDF]">
        {category.map((cate: string) => cate).join(", ")}
      </td>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_type}</td>
      <td className="px-4 py-2 border text-end border-[#DFDFDF]">
        {list.product_quantity}
      </td>
      {/* <td className="px-4 py-2 border border-[#DFDFDF]">
        <span
          className={`rounded-[4px] p-1 inline-flex items-center gap-1 ${statusClasses}`}
        >
          <FontAwesomeIcon className="px-1" icon={statusIcon} />
          <p className="sm:inline hidden">{statusText}</p>
        </span>
      </td> */}
    </tr>
  );
}
