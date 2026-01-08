"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Paginations } from "@/Interfaces/products";

import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import TableApprove from "./table_approve";
import '@/ui/css/table-responsive.css'

interface search {
  search_text: string;
  pagination: number;
}

export default function TapTableApprove() {
  const [item_pending, setItemPending] = useState<Paginations>();
  const [item_approved, setItemApproved] = useState<Paginations>();
  const [search, setSearch] = useState<search>({
    search_text: "",
    pagination: 10,
  });
  const debounceTimer = useRef<any>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      
      const getItemPending = async () => {
        const res = await fetch(
          `/medtch/api/approve-list/pending?limit=${search.pagination}&search_text=${search.search_text}`
        );
        const data = await res.json();
        setItemPending(data);
        
      };

      const getItemApproved = async () => {
        const res = await fetch(
          `/medtch/api/approve-list/approved?limit=${search.pagination}&search_text=${search.search_text}`
        );
        const data = await res.json();
        setItemApproved(data);
      };
      getItemPending();
      getItemApproved();
    }, 600);    

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      
    };
  }, [search]);

  return (
    <>
      {item_pending && (
        <TabGroup defaultIndex={0}>
          <div className="flex md:flex-row flex-col md:justify-between gap-3">
            <TabList className="flex gap-[50px]">
              <Tab className="text-lg font-semibold data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] cursor-pointer">
                รออนุมัติ {item_pending ? `(${item_pending?.total})` : ""}
              </Tab>
              <Tab className="text-lg font-semibold data-[hover]:text-[#0055CA] data-[selected]:text-[#0055CA] cursor-pointer">
                ประวัติการอนุมัติ {item_approved ? `(${item_approved?.total})` : ""}
              </Tab>
            </TabList>

            <div className="flex gap-[10px]">
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
                  className="w-full h-full pl-10 pr-10 py-2 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
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
                  {item_pending && (
                    <TableApprove
                      search={search}
                      setSearch={setSearch}
                      data={item_pending}
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
                  {item_approved && (
                    <TableApprove
                      search={search}
                      setSearch={setSearch}
                      data={item_approved}
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
