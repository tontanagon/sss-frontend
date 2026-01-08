"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function MenuStatus({
  current_status,
  onChangeStatus,
}: {
  current_status: string;
  onChangeStatus: any;
}) {

  const status_all = [
    { status: "pending", name: "รออนุมัติ" },
    { status: "approved", name: "รอจัดของ" },
    { status: "packed", name: "จัดของเสร็จสิ้น" },
    { status: "inuse", name: "กำลังใช้งาน" },
    { status: "returned", name: "รอตรวจสอบคืน" },
    { status: "completed", name: "เสร็จสิ้น" },
    { status: "incomplete", name: "ของไม่ครบ" },
    { status: "reject", name: "ยกเลิก" },
    { status: "overdue", name: "เกินกำหนด" },
  ];

  return (
    <div className="mb-5">
      <Menu>
        <MenuButton className="py-1 px-[10px] w-fit h-fit rounded-sm cursor-pointer border border-gray-200">
          เปลี่ยนสถานะ
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="w-52 origin-top-left mt-1 rounded-sm border border-gray-200 bg-white p-1 text-sm shadow-lg
                   focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
        >
          {status_all.map((s) => (
            <MenuItem key={s.status}>
              <button
                disabled={current_status === s.status}
                className={`bg-white w-full text-left px-3 py-2 rounded-md disabled:bg-gray-100 hover:bg-gray-100 cursor-pointer`}
                onClick={() => onChangeStatus(s)}
              >
                {s.name}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
