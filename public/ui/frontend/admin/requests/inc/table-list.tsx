import { item_booking_histories } from "@/Interfaces/booking-history";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableList({
  list,
  canConfirm,
}: {
  list: item_booking_histories;
  canConfirm: boolean;
}) {
  const category = JSON.parse(list.product_category);

  return (
    <tr>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_name}</td>
      <td className="px-4 py-2 border border-[#DFDFDF]">
        {category.map((cate: string) => cate).join(", ")}
      </td>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_type}</td>
      {canConfirm ? (
        <>
          <td className="px-4 py-2 border text-end border-[#DFDFDF]">
            {list.product_quantity} {list?.product_unit ?? "หน่วย"}
          </td>
          <td className="px-4 py-2 border text-end border-[#DFDFDF]">
            {list.product_quantity_return} {list?.product_unit ?? "หน่วย"}
          </td>
        </>
      ) : (
        <td className="px-4 py-2 border text-end border-[#DFDFDF]">
          {list.product_quantity} {list?.product_unit ?? "หน่วย"}
        </td>
      )}
    </tr>
  );
}
