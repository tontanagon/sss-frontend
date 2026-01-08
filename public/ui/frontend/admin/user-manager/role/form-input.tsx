"use client";
import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import Link from "next/link";
import { Role, Permissions } from "@/Interfaces/user-manager";

export default function FormInput({
  onSubmit,
  data,
}: {
  onSubmit: any;
  data: any | string;
}) {
  const animatedComponents = makeAnimated();
  const [permission, setPermission] = useState<Permissions[]>([]);

  const [items, setItem] = useState<Role>({
    id: 0,
    name: "",
    permissions: [],
  });
  
  useEffect(() => {
    async function fetchPermission() {
      const res = await fetch("/medadm/api/user-manager/permissions");
      const data = await res.json();
      setPermission(data);
    }
    fetchPermission();
  }, []);

  useEffect(() => {
    if (data) {
      setItem({
        ...data,
        permissions: data.permissions ?? [],
      });
    }
  }, [data, permission]);
  
  const options = permission.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Fieldset className="space-y-6 bg-white p-6 sm:p-10 grid grid-cols-2 gap-4">
        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            ชื่อสิทธิ์
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
              (opt) => items.permissions.includes(opt.value) ?? ""
            )}
            value={options.filter((opt) =>
              items.permissions.includes(opt.label)
            )}
            onChange={(selectedOptions) => {
              setItem((prev) => ({
                ...prev,
                permissions: selectedOptions.map((opt) => opt.value),
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
        <input type="hidden" name="permissions" value={items.permissions} />
        <input type="hidden" name="id" value={items.id ?? ''} />
      </Fieldset>

      <div className="flex gap-3 mb-6 ml-[40px]">
        <Button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
        >
          บันทึกรายการ
        </Button>
        <Link
          href="/medadm/roles"
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
