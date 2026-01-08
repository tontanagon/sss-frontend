"use client";
import { BookingList } from "@/Interfaces/booking-history";
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Pagination({
  data,
  setNextPage,
  search_paignation,
  hrefTo,
}: {
  data: any;
  setNextPage: any;
  search_paignation: any;
  hrefTo?: () => void;
}) {
  const [items, setItems] = useState<BookingList>();

  const options = [5, 10, 15, 25, 50, 100];

  const PlusPage = () => {
    const currentIndex = options.indexOf(Number(data.per_page) || 10);
    if (currentIndex < options.length - 1) {
      search_paignation(options[currentIndex + 1],1);
    }
  };

  const MinusPage = () => {
    const currentIndex = options.indexOf(Number(data.per_page) || 10);
    if (currentIndex > 0) {
      search_paignation(options[currentIndex - 1],1);
    }
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  const createPageNumbers = () => {
    const pages = [];
    if (data?.last_page <= 7) {
      // ถ้าน้อยกว่า 7 หน้า แสดงทุกหน้า
      for (let i = 1; i <= data.last_page; i++) pages.push(i);
    } else {
      // แสดงหน้าแรก
      pages.push(1);

      // Ellipsis ก่อนหน้า current_page
      if (items?.current_page! > 4) pages.push("...");

      // แสดงหน้ารอบ ๆ current_page
      const start = Math.max(2, items?.current_page! - 1);
      const end = Math.min(items?.last_page! - 1, items?.current_page! + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      // Ellipsis หลัง current_page
      if (items?.current_page! < items?.last_page! - 3) pages.push("...");

      // แสดงหน้าสุดท้าย
      pages.push(items?.last_page);
    }
    return pages;
  };

  const scrollToSection = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      {items && (
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 justify-end items-center space-x-2 mb-5">
          {search_paignation && (
            <div className="flex items-center gap-2">
              <p>แสดงแถว</p>

              <div className="relative w-24">
                <select
                  value={data.per_page}
                  onChange={(e) => search_paignation(e.currentTarget.value, 1)}
                  className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 pr-8 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow cursor-pointer appearance-none overflow-y-auto"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <div className="flex flex-col w-5 h-10 text-[10px] absolute top-1.5 right-1.5">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={PlusPage}
                  >
                    <FontAwesomeIcon icon={faChevronUp} />
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={MinusPage}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <nav className="flex items-center gap-x-1" aria-label="Pagination">
            <button
              type="button"
              className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous"
              disabled={items?.prev_page_url === null}
              onClick={() => {
                setNextPage(items?.prev_page_url);
                scrollToSection();
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {createPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={idx} className="px-3 py-2 text-sm text-gray-500">
                  …
                </span>
              ) : (
                <button
                  key={idx}
                  type="button"
                  disabled={page === items?.current_page}
                  onClick={() => {
                    setNextPage(items?.links.find((l) => l.label == page)?.url);
                    scrollToSection();
                    console.log(items?.links.find((l) => l.label == page)?.url);
                  }}
                  className={`min-h-9.5 min-w-9.5 py-2 px-3 text-sm rounded-lg ${
                    page === items?.current_page
                      ? "bg-[#0055CA] text-white disabled:pointer-events-none"
                      : "border border-gray-200 text-gray-800 cursor-pointer"
                  }`}
                  aria-current={
                    page === items?.current_page ? "page" : undefined
                  }
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              aria-label="Next"
              disabled={items?.next_page_url === null}
              onClick={() => {
                setNextPage(items?.next_page_url);
                scrollToSection();
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
