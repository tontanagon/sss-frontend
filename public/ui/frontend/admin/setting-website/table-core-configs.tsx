import { CoreConfigs } from "@/Interfaces/core-configs";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import Link from "next/link";


export default function TableCoreConfigs({
  coreConfigsData,
  onDelete,
}: {
  coreConfigsData?: CoreConfigs[];
  onDelete: (id:string) => void;
}) {
  return (
    <Transition
      appear
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500 absolute"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-fixed my-7">
          <thead className="text-base text-white font-medium bg-[#0055CAE5]">
            <tr>
              {/* <th
                scope="col"
                className="sm:px-[5px] sm:py-[10px] px-4 py-2 rounded-s-[8px]"
              ></th> */}
              <th scope="col" className="sm:px-5 sm:py-[10px] px-5 py-2 rounded-s-[8px]">
                รหัส
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                ชื่อ
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                หมวดหมู่
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                ประเภท
              </th>
              <th scope="col" className="sm:px-[5px] sm:py-[10px] px-4 py-2">
                สถานะ
              </th>
              <th
                scope="col"
                className="sm:px-[5px] sm:py-[10px] px-4 py-2 sm:rounded-r-[8px]"
              ></th>
            </tr>
          </thead>
          <tbody>
            {coreConfigsData?.map((core_configs, index: number) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 text-[#1E1E1E] text-sm font-normal"
                >
                  <td className="px-5">{core_configs.code}</td>
                  <td>{core_configs.name}</td>
                  <td>{core_configs.group}</td>
                  <td>{core_configs.category}</td>
                  <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
                    {core_configs.status}
                  </td>
                  <td className="sm:px-[5px] sm:py-[20px] px-4 py-2">
                    <div className="flex gap-3">
                      <Link
                        href={`setting-website/edit/${core_configs.code}`}
                        onNavigate={(e) => {
                          
                        }}
                        className="bg-[#0B9BB533] text-[#0B9BB5] p-[5px_10px] rounded-[8px]"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> แก้ไข
                      </Link>
                      {/* <button
                        type="button"
                        id={core_configs.code || ""}
                        onClick={(e) => onDelete(e.currentTarget.id)}
                        className="bg-[#F20D6C14] text-[#F20D6C] p-[5px_10px] rounded-[8px] cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Transition>
  );
}
