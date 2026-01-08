import {
  BookingHistory,
  item_booking_histories,
} from "@/Interfaces/booking-history";

export default function TableCarousel({ data }: { data: any }) {
  const product_response = (itemlist: item_booking_histories[]) => {
    const item_filter = itemlist.filter(
      (item) => item.product_quantity - item.product_quantity_return > 0
    );
    return item_filter.map((item, idx) => (
      <span key={idx}>
        {idx === 0 ? " - " : ""}
        {item.product_name}
        {idx !== item_filter.length - 1 ? ", " : ""}
        {/* {item.product_quantity - item.product_quantity_return}{" "}
      {item.product_unit || "หน่วย"} */}
      </span>
    ));
  };

  return (
    <div className="flex flex-col md:gap-3 gap-2 text-xl md:mt-7 my-3 mx-1 aspect-[1280/500] rounded-[30px] sm:shadow-[0px_4px_10px_0px_#0000000D] shadow-[0px_4px_10px_0px_#DFDFDF] p-3 overflow-auto">
      <div className="md:text-[1em] text-[0.8em] font-semibold md:p-2.5 ">
        {data.title}
      </div>
      <table className="table-fixed">
        <thead className="text-white font-medium bg-[#0055CAE5]">
          <tr className="md:text-[0.8em] text-[0.7em]">
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-s-[8px] text-start w-[25%]">
              ชื่อ
            </th>
            <th className="md:px-[20px] md:py-[10px] px-2 py-1 rounded-r-[8px] text-start">
              รายละเอียด
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((booking: BookingHistory, index: number) => {
            return (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 md:text-[0.8em] text-[0.7em]"
              >
                <td className="md:px-[20px] md:py-[10px] px-2 py-1">
                  {booking.user_code} {booking.user_name}
                </td>
                <td className="md:px-[20px] md:py-[10px] px-2 py-1">
                  <div className="flex md:flex-row flex-col gap-1">
                    <div>กิจกรรม : {booking.activity_name}</div>
                    <div className="flex gap-1">
                      {product_response(booking.item_booking_histories)}
                    </div>
                    {booking?.remark && (
                      <div>
                        ,
                        <strong> หมายเหตุ</strong> : {booking.remark}{" "}
                      </div>
                    )}
                    {/* <div>
                        อาจารย์ - {booking.teacher}
                    </div> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
