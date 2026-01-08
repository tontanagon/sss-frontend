"use client";
import { faFilter, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
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
import Pagination from "@/ui/layout/pagination";
import {
  BookingHistory,
  BookingList,
  fetchDataBookingHistory,
} from "@/Interfaces/booking-history";
import Link from "next/link";
import '@/ui/css/table-responsive.css'

interface search {
  search_text: string;
  search_status: string[];
  pagination: number;
}

export default function Taps() {
  const [allItems, setAllItems] = useState<BookingList>();
  const [borrowItems, setBorrowItems] = useState<BookingList>();
  const [returnedItems, setReturnedItems] = useState<BookingList>();

  const [search, setSearch] = useState<search>({
    search_text: "",
    search_status: [],
    pagination: 10,
  });

  const [checkboxList, setCheckboxList] = useState([
    { name: "pending", name_th: "รออนุมัติ", checked: false },
    { name: "approved", name_th: "รอจัดของ", checked: false },
    { name: "packed", name_th: "จัดของเสร็จสิ้น", checked: false },
    { name: "inuse", name_th: "กำลังใช้งาน", checked: false },
    { name: "returned", name_th: "รอตรวจสอบการคืน", checked: false },
    { name: "overdue", name_th: "เกินกำหนดคืน", checked: false },
    { name: "completed", name_th: "คืนสำเร็จ", checked: false },
    { name: "incomplete", name_th: "ของไม่ครบ", checked: false },
    { name: "reject", name_th: "ยกเลิก", checked: false },
  ]);

  const toggleCheckbox = (index: number) => {
    const newList = [...checkboxList];
    newList[index].checked = !newList[index].checked;
    setCheckboxList(newList);
  };

  useEffect(() => {
    const selected = checkboxList
      .filter((item) => item.checked)
      .map((item) => item.name);

    setSearch((prev) => ({
      ...prev,
      search_status: selected,
    }));
  }, [checkboxList]);

  const debounceTimer = useRef<any>(null);

  const getSearchResult = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        const [allRes, borrowRes, returnedRes] = await Promise.all([
          fetch(
            `/api/booking-history/all?limit=${search.pagination}&search_text=${search.search_text}&search_status=${search.search_status}`
          ),
          fetch(
            `/api/booking-history/borrow?limit=${search.pagination}&search_text=${search.search_text}&search_status=${search.search_status}`
          ),
          fetch(
            `/api/booking-history/returned?limit=${search.pagination}&search_text=${search.search_text}`
          ),
        ]);

        const [allData, borrowData, returnedData] = await Promise.all([
          allRes.json(),
          borrowRes.json(),
          returnedRes.json(),
        ]);

        setAllItems(allData);
        setBorrowItems(borrowData);
        setReturnedItems(returnedData);
      } catch (err) {
        console.error(err);
      }
    }, 600);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  };

  useEffect(() => {
    getSearchResult();
  }, [search]);

  return (
    <>
      {allItems && (
        <TabGroup defaultIndex={0}>
          <div className="flex md:flex-row flex-col md:justify-between gap-4">
            <TabList className="flex md:gap-[45px] gap-5 md:text-lg font-semibold">
              <Tab className="data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] data-[selected]:outline-none cursor-pointer ">
                ทั้งหมด {allItems ? `(${allItems?.total})` : ""}
              </Tab>
              <Tab className="data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] data-[selected]:outline-none cursor-pointer">
                เบิกอุปกรณ์ {borrowItems ? `(${borrowItems?.total})` : ""}
              </Tab>
              <Tab className="data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] data-[selected]:outline-none cursor-pointer">
                คืนอุปกรณ์ {returnedItems ? `(${returnedItems?.total})` : ""}
              </Tab>
            </TabList>

            <div className="flex gap-[10px]">
              {search.search_text || search.search_status.length ? (
                <button
                  className="text-[#dd0000] md:text-base text-sm flex items-center gap-1 cursor-pointer"
                  type="button"
                  onClick={() => {
                    setCheckboxList(
                      checkboxList.map((item) => ({ ...item, checked: false }))
                    );
                    setSearch({
                      pagination: 10,
                      search_text: "",
                      search_status: [],
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} /> ล้างตัวกรอง
                </button>
              ) : (
                <></>
              )}

              <Popover>
                <PopoverButton className="flex items-center gap-2 text-sm text-[#0055CA] font-normal border border-[#D9D9D9] rounded-[20px] p-[12px_20px] cursor-pointer">
                  <FontAwesomeIcon icon={faFilter} />
                  <div className="xl:block hidden">กรองสถานะ</div>
                </PopoverButton>

                <PopoverPanel
                  anchor="bottom"
                  className="gap-3 bg-white w-45 border border-[#D9D9D9] mt-1 py-4 px-2 rounded"
                >
                  {checkboxList.map((item, index) => (
                    <div key={index} className="flex flex-row">
                      <Checkbox
                        key={item.name}
                        checked={item.checked}
                        onChange={() => toggleCheckbox(index)}
                        className="group block size-4 rounded border bg-white data-checked:bg-blue-500 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:data-disabled:bg-gray-500"
                      >
                        <svg
                          className="stroke-white opacity-0 group-data-checked:opacity-100"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Checkbox>
                      <span className="ml-2">{item.name_th}</span>
                    </div>
                  ))}
                </PopoverPanel>
              </Popover>

              <div className="relative text-sm text-[#888686] border border-[#D9D9D9] rounded-[20px] bg-white ">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888686]"
                />

                <input
                  value={search.search_text}
                  autoComplete="off"
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearch({ ...search, search_text: val });
                  }}
                  type="text"
                  id="default-search"
                  className="w-full h-full pl-10 pr-10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ค้นหา"
                  aria-label="ค้นหา"
                />
              </div>
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
                    />
                  )}
                </div>
              </Transition>
            </TabPanel>
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
                  {borrowItems && (
                    <TableTaps
                      search={search}
                      setSearch={setSearch}
                      data={borrowItems}
                    />
                  )}
                </div>
              </Transition>
            </TabPanel>
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
                  {returnedItems && (
                    <TableTaps
                      search={search}
                      setSearch={setSearch}
                      data={returnedItems}
                    />
                  )}
                </div>
              </Transition>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}
    </>
  );
}
