import { BookingHistory } from "@/Interfaces/booking-history";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BookingInfo({ items }: { items: BookingHistory }) {
  function formatDateToThai(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // เดือนเริ่มที่ 0
    const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

    return `${day}/${month}/${year}`;
  }

  const InfoBox = ({ children }: any) => (
    <div className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full mt-3 rounded-[5px] border border-[#D9D9D9] bg-gray-100 p-[14px_20px] shadow-sm">
      {children}
    </div>
  );

  return (
    <div className="sm:grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        ชื่อ - สกุล
        <InfoBox>{items.user_name}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        รหัสนักศึกษา
        <InfoBox>{items.user_code}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        ชั้นปี
        <InfoBox>{items.user_grade}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        เบอร์โทร
        <InfoBox>{items.phone_number}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        วันที่เบิก
        <InfoBox>{formatDateToThai(items.created_at)}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        วันที่คืน
        <InfoBox>{formatDateToThai(items.return_at)}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        กระบวนวิชา
        <InfoBox>{items.subject}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        อาจารย์
        <InfoBox>{items.teacher}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium lg:col-span-3 text-black sm:mt-0 mt-2">
        ชื่อกิจกรรม
        <InfoBox>{items.activity_name}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium text-black sm:mt-0 mt-2">
        จำนวนผู้เข้าร่วม
        <InfoBox>{items.participants}</InfoBox>
      </div>
      <div className="sm:text-lg text-base font-medium lg:col-span-4 md:col-span-2 text-black sm:mt-0 mt-2">
        หมายเหตุ
        {items?.remark ? (
          <div className="flex items-center  gap-2 mt-3 p-4 rounded-[8px] border-l-4 border-blue-500 bg-blue-50 shadow-md">
            <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500"/>
            <div className="sm:text-base text-sm text-blue-800 font-medium">
              {items?.remark ?? "-"}
            </div>
          </div>
        ) : (
          <InfoBox> - </InfoBox>
        )}
      </div>
    </div>
  );
}
