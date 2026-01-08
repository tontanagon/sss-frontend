"use client";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Textarea,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
// import Image from "next/image";

export default function FormInput({
  onSubmit,
  data,
}: {
  onSubmit: any;
  data: any | null;
}) {
  const [items, setItem] = useState({
    name: "",
    image: "",
    description: "",
    status: "active",
  });

  if (data) {
    useEffect(() => {
      setItem(data);
    }, [data]);
  }

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <Fieldset className="space-y-6 bg-white p-6 sm:p-10 grid grid-cols-2 gap-4">
        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            ชื่อTag
          </Label>
          <Input
            className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
            name="name"
            value={items.name ?? ""}
            onChange={(e) => setItem({ ...items, name: e.target.value })}
          />
        </Field>

        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            สถานะ
          </Label>
          <Listbox
            name="status"
            value={items.status ?? ""}
            onChange={(value) => setItem({ ...items, status: value })}
          >
            <ListboxButton className="flex justify-between items-center sm:text-base text-sm text-[#1E1E1E] font-normal w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]">
              <div>{items.status == "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}</div>
              <FontAwesomeIcon className="" icon={faChevronDown} />
            </ListboxButton>

            <ListboxOptions
              className={clsx(
                "absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10"
              )}
            >
              <ListboxOption
                value="active"
                className="cursor-default select-none py-2 px-4 text-black hover:bg-gray-100"
              >
                ใช้งาน
              </ListboxOption>

              <ListboxOption
                value="inactive"
                className="cursor-default select-none py-2 px-4 text-black hover:bg-gray-100"
              >
                ไม่ได้ใช้งาน
              </ListboxOption>
            </ListboxOptions>
          </Listbox>
        </Field>

        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            คำอธิบาย
          </Label>
          <Textarea
            name="description"
            className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
            value={items.description ?? ""}
            onChange={(e) => setItem({ ...items, description: e.target.value })}
          />
        </Field>
        <input type="hidden" name="id" value={data.id ?? ""} />
      </Fieldset>

      <div className="flex gap-3 mb-6 ml-[40px]">
        <Button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
        >
          บันทึกรายการ
        </Button>
        <Link
          href="/medadm/tags"
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
