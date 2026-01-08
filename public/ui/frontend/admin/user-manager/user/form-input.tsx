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
} from "@headlessui/react";
import { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Role, UserInformation } from "@/Interfaces/user-manager";

export default function FormInput({
  onSubmit,
  data,
}: {
  onSubmit: any;
  data: any | string;
}) {
  const animatedComponents = makeAnimated();
  const [role, setRole] = useState<Role[]>([]);
  
  const [image_select, setImageSelect] = useState<any>();

  const [items, setItem] = useState<UserInformation>({
    id:0,
    name: "",
    email: "",
    image: "",
    password: "",
    login_type: "application",
    roles: [],
  });

  useEffect(() => {
    async function fetchRole() {
      const res = await fetch("/medadm/api/user-manager/role/get");
      const data = await res.json();
      setRole(data);
    }
    fetchRole();
  }, []);

  useEffect(() => {
    if (data) {
      setItem({
        ...data,
        roles: data.roles ?? [],
      });
    }
  }, [data, role]);

  const options = role.map((c) => ({
    value: c.name,
    label: c.name,
  }));
  
  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Fieldset className="space-y-6 bg-white p-6 sm:p-10 grid grid-cols-2 gap-4">
        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            ชื่อผู้ใช้
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
            อีเมล
          </Label>
          <Input
          type="email"
            className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
            name="email"
            value={items.email ?? ""}
            onChange={(e) => setItem({ ...items, email: e.target.value })}
          />
        </Field>

        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            รหัสผ่าน
          </Label>
          <Input
            placeholder="หากไม่ใส่จะเป็นรหัสเดิม กรณีแก้ไข"
            className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
            name="password"
            value={items.password ?? ""}
            onChange={(e) => setItem({ ...items, password: e.target.value })}
          />
        </Field>
        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            ประเภทการเข้าใช้งาน
          </Label>
          <Listbox
            name="login_type"
            value={items.login_type ?? ""}
            onChange={(value) => {
              setItem({
                ...items,
                login_type: value,
              });
            }}
          >
            <ListboxButton className="flex justify-between items-center sm:text-base text-sm text-[#1E1E1E] font-normal w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]">
              <div>{items.login_type}</div>
              <FontAwesomeIcon icon={faChevronDown} />
            </ListboxButton>

            <ListboxOptions className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              <ListboxOption
                value="application"
                className="cursor-default select-none py-2 px-4 text-black hover:bg-gray-100"
              >
                application
              </ListboxOption>

              <ListboxOption
                value="microsoft"
                className="cursor-default select-none py-2 px-4 text-black hover:bg-gray-100"
              >
                microsoft
              </ListboxOption>
            </ListboxOptions>
          </Listbox>
        </Field>

        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            รูปภาพ
          </Label>
          <Input
            type="file"
            className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]
                                 file:text-sm file:font-semibold
                                 file:mr-4
                                 cursor-pointer
                                 "
            name="image"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setItem({ ...items, image: file });
              setImageSelect(file ? URL.createObjectURL(file) : undefined);
            }}
          />
          <div
            className={`mt-5 h-20 w-20 ${items.image ? "relative" : "hidden"}`}
          >
            <Image
              src={
                image_select ??
                `${items.image || '/images/no-picture.png'}`
              }
              alt="image"
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={(e) => setItem({ ...items, image: "" })}
              className={` text-red-500 -top-2 -right-4 cursor-pointer ${
                image_select ? "hidden" : "absolute"
              }`}
            >
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          </div>
        </Field>

        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            สิทธิ์การใช้งาน
          </Label>
          <Select
            required
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            placeholder="สิทธิ์การใช้งาน..."
            options={options}
            defaultValue={options.filter(
              (opt) => items.roles.includes(opt.value) ?? ""
            )}
            value={options.filter((opt) => items.roles.includes(opt.label))}
            onChange={(selectedOptions) => {
              setItem((prev:any) => ({
                ...prev,
                roles: selectedOptions.map((opt) => opt.value),
              }));
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#FFFFFF",
                borderColor: state.isFocused ? "#A3A3A3" : "#D9D9D9",
                borderWidth: "1px",
                borderRadius: "0.375rem", // rounded-md
                margin: "12px 0px",
                padding: "0px 0px 0px 10px",
                boxShadow: state.isFocused ? "0 0 0 2px #D9D9D9" : undefined,
              }),
              input: (base) => ({
                ...base,
                color: "#1E1E1E",
                fontSize: "0.875rem", // text-sm
                margin: "12px 0px",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#F3F4F6" : "#FFFFFF",
                color: "#1E1E1E",
                fontSize: "0.875rem",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#D9D9D9",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#5b5b5bff",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#A3A3A3",
                ":hover": {
                  backgroundColor: "#A3A3A3", // hover:bg-violet-300
                  color: "#FFFFFF",
                },
              }),
            }}
          />
        </Field>

        <input type="hidden" name='id' value={items.id ?? ''}/>
        <input type="hidden" name='roles' value={items.roles ?? ''}/>
      </Fieldset>

      <div className="flex gap-3 mb-6 ml-[40px]">
        <Button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
        >
          บันทึกรายการ
        </Button>
        <Link
        href='/medadm/users'
          type="submit"
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
