import {
  faList,
  faPenToSquare,
  faShareFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export default function MenuTable({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id:string) => void;
}) {
  return (
    <Menu>
      <MenuButton
        className="py-1 px-[10px] rounded-sm
        focus:not-data-focus:outline-none 
        data-focus:outline data-focus:outline-white 
        data-hover:bg-gray-100
        data-open:bg-gray-100
        md:border-0 cursor-pointer"
      >
        <FontAwesomeIcon icon={faList} className="text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom"
        className="w-35 !max-h-80 z-50 origin-top-right rounded-xl border bg-white border-white/5 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:opacity-0 shadow-lg flex flex-col"
      >
        <MenuItem>
          <Link
            href={`products/history/${id}`}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer text-[#4c4c4c]"
          >
            <FontAwesomeIcon icon={faShareFromSquare} /> ประวัติ
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={`products/edit/${id}`}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer text-[#0B9BB5]"
          >
            <FontAwesomeIcon icon={faPenToSquare} /> แก้ไข
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            id={id}
            onClick={() => onDelete(id)}
            className="group flex text-[#DD0000] w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10 cursor-pointer "
          >
            <FontAwesomeIcon icon={faTrashCan} /> ลบ
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
