"use client";

import { BookingStatus, style_status_class } from "@/lib/bookingStatus";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function StatusReport({ serchDate = "" }: { serchDate?: Date | string }) {
  const [items, setItems] = useState<any>();
  useEffect(() => {
    
    const getItem = async () => {
      const res = await fetch("/medadm/api/dashboard/status-report");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    };
    getItem();
    
  }, []);

  return (
    <>
      {items && (
        <div className="flex justify-between my-5 gap-2">
          {items?.map((item: any) => {
            const status: BookingStatus = item.status;
            const current_styles = style_status_class[status];
            return (
              <Link
                href={{
                  pathname: "/medadm/requests",
                  query: { status: item.status },
                }}
                key={item.name}
                onNavigate={(e) => {
                  
                }}
                className={`w-full h-full rounded text-end py-6 shadow-md px-2 transition-all duration-100 hover:scale-102 ${current_styles.style_status}`}
              >
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-2xl font-semibold">
                  {" "}
                  {item.count ?? 0} รายการ
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
