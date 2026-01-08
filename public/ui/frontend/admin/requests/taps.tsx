"use client";
import {
  faCircleCheck,
  faCircleXmark,
  faFilter,
  faPrint,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Popover,
  PopoverButton,
  PopoverPanel,
  Checkbox,
} from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import TableTaps from "./inc/taps-table";
import { BookingList } from "@/Interfaces/booking-history";
import { useRouter } from 'nextjs-toploader/app'; 
import { useSearchParams } from "next/navigation";
import "@/ui/css/table-responsive.css";
import ModalCheck from "@/ui/layout/modal-check";
import ModalConfirm from "@/ui/layout/modal-confirm";
import { ApiResponse } from "@/Interfaces/response";

interface search {
  search_text: string;
  search_status?: (string | null)[];
  pagination: number;
}

export default function Taps() {
  const search_path_status = useSearchParams().get("status");
  const router = useRouter();
  const [allItems, setAllItems] = useState<BookingList>();

  const [showModal, setShowModal] = useState(false);

  const [response, setResponse] = useState<ApiResponse>();

  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faCircleCheck);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [arrayPrint, setArrayPrint] = useState<any>([]);
  
  const [search, setSearch] = useState<search>({
    search_text: "",
    search_status: [],
    pagination: 10,
  });

  const debounceTimer = useRef<any>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      

      const getAllItems = async () => {
        const res = await fetch(
          `/medadm/api/requests/all?limit=${search.pagination}&search_text=${search.search_text}&search_status=${search_path_status}`
        );
        const data = await res.json();
        setAllItems(data);
      };

      getAllItems();
      
    }, 600);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, search_path_status]);

  useEffect(() => {
    setSearch({ ...search, search_status: [search_path_status] });
    setArrayPrint([]);
  }, [search_path_status]);

  const LinkPrintPage = () => {
    router.push(
      `requests/print?id=${arrayPrint}${
        search_path_status && `&status=${search_path_status}`
      }`
    );
  };

  const ConfirmPackList = async () => {
    const res = await fetch(`/medadm/api/requests/confirm-pack-list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_check: arrayPrint }),
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("ยืนยันหลายรายการไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("ยืนยันหลายรายการสำเร็จ");
      setIcon(faCircleCheck);
    }
    setResponse(data);
    setShowModal(true);
  };

  return (
    <>
      {allItems && (
        <TabGroup defaultIndex={0}>
          <div className="flex md:flex-row flex-col md:justify-between mt-5 gap-3">
            <div className="flex items-center gap-6">
              <div className="md:text-3xl text-xl font-bold">รายการคำขอ</div>
              <p className="text-[#1E1E1E] text-base font-bold">
                ทั้งหมด {allItems.total} รายการ
              </p>
            </div>

            <div className="flex gap-[10px]">
              {search.search_text ? (
                <button
                  className="text-[#dd0000] flex items-center gap-1 cursor-pointer"
                  type="button"
                  onClick={() => {
                    setSearch({
                      pagination: 10,
                      search_text: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} /> ล้างตัวกรอง
                </button>
              ) : (
                <></>
              )}

              <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
                />

                <input
                  value={search.search_text}
                  autoComplete="off"
                  onChange={(e) =>
                    setSearch({ ...search, search_text: e.target.value })
                  }
                  type="text"
                  id="default-search"
                  className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="ค้นหา"
                  aria-label="ค้นหา"
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-white  bg-[#0055CA] font-normal rounded-[20px] p-[12px_20px] cursor-pointer border hover:bg-white hover:text-[#0055CA]  hover:border-[#0055CA] transition-colors"
                onClick={LinkPrintPage}
              >
                <FontAwesomeIcon icon={faPrint} />
                Print
              </button>
              {search_path_status === "approved" && (
                <button
                  disabled={arrayPrint.length === 0}
                  onClick={() => setShowModalConfirm(true)}
                  className={`px-4 py-2 rounded-[20px] 
                    ${
                      arrayPrint.length === 0
                        ? "bg-gray-300 text-gray-500"
                        : "bg-green-600 text-white hover:bg-white hover:text-green-600 border border-green-600 transition-colors cursor-pointer"
                    }`}
                >
                  ยืนยันรายการ{" "}
                  {arrayPrint.length > 0 && `(${arrayPrint.length})`}
                </button>
              )}
            </div>
          </div>

          <TabPanels className="mt-3 relative min-h-[100px]">
            <TabPanel as={Fragment}>
              <Transition
                appear
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200 absolute"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="relative md:my-7 my-5">
                  {allItems && (
                    <TableTaps
                      search={search}
                      setSearch={setSearch}
                      data={allItems}
                      setArrayPrint={setArrayPrint}
                    />
                  )}
                </div>
              </Transition>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}
      <ModalCheck
        show={showModal}
        header="ยืนยันการจัดของ"
        status_style={style}
        icon={icon}
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => window.location.reload()
        }
        title={title}
        des={error_message}
      />
      <ModalConfirm
        show={showModalConfirm}
        header={`ยืนยันการจัดของ`}
        description={`ยืนยันการจัดของหลายรายการ ใช่ หรือ ไม่`}
        onClose={() => setShowModalConfirm(false)}
        onConfirm={() => ConfirmPackList()}
        style_button="bg-[#6DBD70] text-white"
      />
    </>
  );
}
