import { item_booking_histories } from "@/Interfaces/booking-history";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableList({ list }: { list: item_booking_histories }) {
  const category = JSON.parse(list.product_category);
  
  return (
    <tr>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_name}</td>
      <td className="px-4 py-2 border border-[#DFDFDF]">
        {category.map((cate: string) => cate).join(", ")}
      </td>
      <td className="px-4 py-2 border border-[#DFDFDF]">{list.product_type}</td>
      <td className="px-4 py-2 border border-[#DFDFDF]">
        {list.product_quantity}
      </td>
   
    </tr>
  );
}
