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
import {
  faChevronDown,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Category, Items, Tag, Type } from "@/Interfaces/products";
import { Router } from "next/router";
import { useRouter } from "nextjs-toploader/app";

interface option {
  id: number;
  name: string;
}

export default function FormInput({
  onSubmit,
  data,
  setCheckNullModal,
  onEditStock,
}: {
  onSubmit: any;
  data: any;
  setCheckNullModal: any;
  onEditStock: any;
}) {
  const router = useRouter();
  const animatedComponents = makeAnimated();
  const [category, setCategory] = useState<option[]>([
    {
      id: 0,
      name: "",
    },
  ]);
  const [types, setType] = useState<option[]>([
    {
      id: 0,
      name: "",
    },
  ]);
  const [tags, setTags] = useState<option[]>([
    {
      id: 0,
      name: "",
    },
  ]);

  const [image_select, setImageSelect] = useState<any>();
  const [items, setItem] = useState<Items>({
    id: "",
    name: "",
    code: "",
    image: "",
    category_ids: [],
    tags: [],
    type: "",
    description: "",
    unit: "",
    type_id: 1,
    stock: 0,
    status: "active",
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    async function fetchCategory() {
      const res = await fetch("/medadm/api/products/option/category");
      const data = await res.json();
      setCategory(data);
    }

    async function fetchType() {
      const res = await fetch("/medadm/api/products/option/type");
      const data = await res.json();
      setType(data);
    }

    async function fetchTag() {
      const res = await fetch("/medadm/api/products/option/tag");
      const data = await res.json();
      setTags(data);
    }

    fetchTag();
    fetchType();
    fetchCategory();
  }, []);

  // ตั้งค่าจาก data
  useEffect(() => {
    if (data) {
      setItem({
        ...data,
        category_ids: data.category_ids ?? [],
        tags: data.tags ?? [],
      });
    }
  }, [data]);

  // fallback ด้วย types ถ้าไม่มี data
  useEffect(() => {
    if (!data && types?.length) {
      setItem((prev: any) => ({
        ...prev,
        type: types[0].name,
        type_id: types[0].id,
      }));
    }
  }, [data, types]);

  // เช็คข้อมูลที่จำเป็น
  useEffect(() => {
    if (!category?.length || !types?.length) {
      setCheckNullModal(true);
    }
  }, [category, types]);

  const options_category = category?.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const options_tag = tags?.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  return (
    <>
      {isMounted && (
        <form autoComplete="off" onSubmit={onSubmit}>
          <Fieldset className="space-y-6 bg-white p-6 sm:p-10 grid grid-cols-2 gap-4 mb-3">
            <Field>
              <Label className="sm:text-lg text-base font-medium text-black">
                ชื่อรายการ
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
                รหัส
              </Label>
              <Input
                className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                name="code"
                value={items.code ?? ""}
                onChange={(e) => setItem({ ...items, code: e.target.value })}
              />
            </Field>

            <Field>
              <Label className="sm:text-lg text-base font-medium text-black">
                หมวดหมู่
              </Label>
              <Select
                required
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="ค้นหาหมวดหมู่..."
                options={options_category}
                defaultValue={options_category?.filter(
                  (opt) => items.category_ids.includes(opt.value) ?? ""
                )}
                value={options_category?.filter((opt) =>
                  items.category_ids.includes(opt.value)
                )}
                onChange={(selectedOptions) => {
                  setItem((prev) => ({
                    ...prev,
                    category_ids: selectedOptions.map((opt) => opt.value),
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
                    boxShadow: state.isFocused
                      ? "0 0 0 2px #D9D9D9"
                      : undefined,
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

            <Field>
              <Label className="sm:text-lg text-base font-medium text-black">
                Tag
              </Label>
              <CreatableSelect
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="ค้นหาหรือเพิ่มTag..."
                options={options_tag}
                defaultValue={items.tags.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
                value={items.tags.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
                onChange={(selectedOptions) => {
                  setItem((prev) => ({
                    ...prev,
                    tags: selectedOptions.map((opt) => opt.value),
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
                    boxShadow: state.isFocused
                      ? "0 0 0 2px #D9D9D9"
                      : undefined,
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

            <Field>
              <Label className="sm:text-lg text-base font-medium text-black">
                ประเภท
              </Label>
              <Listbox
                name="type"
                value={items.type ?? ""}
                onChange={(value) => {
                  const matchedType = types?.find((t) => t.name === value);
                  setItem({
                    ...items,
                    type: value,
                    type_id: matchedType ? matchedType.id : 0,
                  });
                }}
              >
                <ListboxButton
                  className={`flex justify-between items-center sm:text-base text-sm text-[#1E1E1E] font-normal w-full bg-white rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9] ${
                    data ? "mt-4" : "mt-3"
                  }`}
                >
                  <div>{items.type}</div>
                  <FontAwesomeIcon icon={faChevronDown} />
                </ListboxButton>

                <ListboxOptions
                  className={clsx(
                    "absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10"
                  )}
                >
                  {types?.map((type: any, index: number) => (
                    <ListboxOption
                      key={index}
                      value={type.name}
                      className="cursor-default select-none py-2 px-4 text-black hover:bg-gray-100"
                    >
                      {type.name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <Label className="sm:text-lg text-base font-medium text-black">
                  จำนวน
                </Label>
                {data ? (
                  <button
                    type="button"
                    id={data.id}
                    value={data.stock}
                    onClick={onEditStock}
                    className="bg-[#0B9BB533] text-[#0B9BB5] px-3 py-1 rounded-[8px] cursor-pointer"
                  >
                    เพิ่ม-ลด
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              <Input
                className={`sm:text-base text-sm text-[#1E1E1E] font-normal block w-full mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9] ${
                  data ? "bg-[#FAFAFA]" : "bg-white "
                }`}
                name="stock"
                type="number"
                disabled={data}
                value={items.stock ?? ""}
                onChange={(e) =>
                  setItem({ ...items, stock: e.target.value })
                }
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
                  <div>
                    {items.status == "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
                  </div>
                  <FontAwesomeIcon icon={faChevronDown} />
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
                หน่วย
              </Label>
              <Input
                className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                name="unit"
                value={items.unit ?? ""}
                onChange={(e) => setItem({ ...items, unit: e.target.value })}
              />
            </Field>

            <Field className="relative">
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
                className={`mt-5 h-20 w-20 ${
                  items.image ? "absolute" : "hidden"
                }`}
              >
                <Image
                  src={
                    image_select ?? `${items.image || "/images/no-picture.png"}`
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
                คำอธิบาย
              </Label>
              <Textarea
                name="description"
                className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                value={items.description ?? ""}
                onChange={(e) =>
                  setItem({ ...items, description: e.target.value })
                }
              />
            </Field>

            <input
              type="hidden"
              name="category"
              value={items.category_ids?.join(",") ?? ""}
            />

            <input
              type="hidden"
              name="tags"
              value={items.tags?.join(",") ?? ""}
            />
            <input type="hidden" name="type_id" value={items.type_id ?? ""} />
            <input
              type="hidden"
              name="image_old_path"
              value={items.image ?? ""}
            />
            <input type="hidden" name="id" value={data.id ?? ""} />
          </Fieldset>

          <div className="flex gap-3 mb-10 ml-[40px]">
            <Button
              type="submit"
              className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
            >
              บันทึกรายการ
            </Button>
            <button className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer" onClick={() => router.back()}>ยกเลิก</button>
            <Link href="/medadm/products"></Link>
          </div>
        </form>
      )}
    </>
  );
}
