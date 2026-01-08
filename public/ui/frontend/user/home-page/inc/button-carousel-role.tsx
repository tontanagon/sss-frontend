import Link from "next/link";
import { useEffect, useState } from "react";

export default function ButtonCarouselRole({
  role = ["Student"],
}: {
  role?: any;
}) {
  const [button, setButton] = useState({
    name1: "จองอุปกรณ์",
    link1: "/my-cart",
    name2: "คืนอุปกรณ์",
    link2: "/booking-history",
  });

  useEffect(() => {
    if (role.includes("Administrator")) {
      return setButton({
        name1: "ภาพรวม",
        link1: "/medadm",
        name2: "จัดการคำขอ",
        link2: "/medadm/requests",
      });
    }
    if (role.includes("Teacher")) {
      return setButton({
        name1: "ภาพรวม",
        link1: "/medtch/dashboard",
        name2: "รายการอนุมัติ",
        link2: "/medtch",
      });
    }
  }, [role]);

  return (
    <div className="absolute lg:bottom-[15%] bottom-[10%] left-[5%] flex gap-[10px] flex-wrap">
      <Link
        href={button.link1}
        className="text-white bg-[#0055CA] hover:bg-blue-800 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-blue-300 font-medium rounded-[30px]
                        text-[10px] sm:text-[14px] lg:text-[16px]
                        px-[12px] sm:px-[24px] lg:px-[30px]
                        py-[2px] sm:py-[6px] lg:py-[10px]"
      >
        {button.name1}
      </Link>
      <Link
        href={button.link2}
        className="text-[#0055CA] bg-white hover:text-white border border-[#0055CA] hover:bg-[#0055CA] focus:ring-2 md:focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px]
                        text-[10px] sm:text-[14px] lg:text-[16px]
                        px-[12px] sm:px-[24px] lg:px-[30px]
                        py-[2px] sm:py-[6px] lg:py-[10px]"
      >
        {button.name2}
      </Link>
    </div>
  );
}
