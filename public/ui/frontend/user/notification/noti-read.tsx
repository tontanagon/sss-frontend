"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'nextjs-toploader/app'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Pagination from "@/ui/layout/pagination";

export default function NotiRead() {
  const router = useRouter();
  const [noti, setNoti] = useState<any>();
  const [nextPage, setNextPage] = useState<any>();
  const [search, setSearch] = useState<any>({
    pagination:10
  });

  useEffect(() => {
    const getNoti = async () => {
      const res = await fetch(`/api/notification/read?limit=${search.pagination}`);
      const data = await res.json();
      setNoti(data);
    };
    getNoti();
  }, [search]);

  useEffect(() => {
    const getItems = async () => {
      const res = await fetch("/api/pagination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nextPage: nextPage,
          query: search,
        }),
      });
      if (res.ok) {
        const data_res = await res.json();
        setNoti(data_res);
      }
    };
    if (nextPage) {
      getItems();
    }
  }, [nextPage]);

  const setFormatTime = (date: string) => {
    const current_date = new Date().toLocaleDateString("th-TH");
    const noti_date = new Date(date).toLocaleDateString("th-TH");
    if (current_date == noti_date) {
      return new Date(date).toLocaleTimeString("th-TH");
    } else {
      return new Date(date).toLocaleDateString("th-TH");
    }
  };
  
  return (
    <>
      {noti && noti?.data?.length > 0 ? (
        <>
          <div className="flex flex-col gap-5 my-4">
            {noti?.data.map((item: any) => (
              <Link
                key={item.id}
                href={item.data[0].url ?? ""}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Title */}
                <div
                  className={`text-lg font-semibold mb-1 ${
                    item.data[0]?.style_text ?? "text-gray-800"
                  }`}
                >
                  {item.data[0].title}
                </div>

                {/* Message */}
                <div className="text-gray-700 text-sm mb-3">
                  {item.data[0].message}
                </div>

                {/* Time */}
                <div className="text-end text-xs text-gray-400">
                  {setFormatTime(item.created_at)}
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            data={noti}
            setNextPage={setNextPage}
            search_paignation={(perpage: number) => setSearch({...search, pagination:perpage})}
          />
        </>
      ) : (
        <div className="text-center text-gray-400 italic py-10">
          ไม่พบการแจ้งเตือน
        </div>
      )}
    </>
  );
}
