"use client"; 
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Pagination from "@/ui/layout/pagination";


export default function NotiUnRead() {
  const [noti, setNoti] = useState<any>();
  const [nextPage, setNextPage] = useState<any>();
  const [search, setSearch] = useState<any>({
    pagination: 10,
  });

  useEffect(() => {
    const getNoti = async () => {
      const res = await fetch(
        `/api/notification/unread?limit=${search.pagination}`
      );
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

  const makeRead = async (uuid:string | null = null) => {
    const res = await fetch(`/api/notification/make-as-read?uuid=${uuid ?? 'all' }`);

    if (res.ok && !uuid) {
      window.location.reload();
    }
  };

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
          <div className="flex justify-end my-2">
            <button
              type="button"
              onClick={() => makeRead()}
              className="px-4 py-2 rounded-xl bg-[#3FB0D9] text-white text-sm font-medium shadow hover:bg-[#34a0c6] transition-colors duration-200 cursor-pointer flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faCheck} /> ทำเครื่องหมายว่าอ่านแล้ว
            </button>
          </div>

          {/* รายการแจ้งเตือน */}
          <div className="flex flex-col gap-5 my-4">
            {noti?.data.map((item: any) => (
              
              <Link
                key={item.id}
                href={item.data[0].url ?? ''}
                onClick={() => makeRead(item.id)}
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
            search_paignation={(perpage: number) =>
              setSearch({ ...search, pagination: perpage })
            }
          />
        </>
      ) : (
        <div className="text-center text-gray-400 italic py-10">
          ไม่พบการแจ้งเตือนล่าสุด
        </div>
      )}
    </>
  );
}
