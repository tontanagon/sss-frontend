"use client";
import { CoreConfigs, CoreConfigsForm } from "@/Interfaces/core-configs";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Select,
  Switch,
  Textarea,
} from "@headlessui/react";
import CoverUploadSection from "./cover";
import Image from "next/image";
import { circle_info } from "@/constants/asset-path";
import { useEffect, useState } from "react";
import TextBox from "./textbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import TextEditor from "./text-editor";

export default function FormCoreConfigs({
  data,
  className = "",
  onSubmit,
}: {
  data?: CoreConfigs;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<CoreConfigsForm>({
    name: "",
    code: "",
    link: "",
    cover: "",
    title: "",
    description: "",
    content: "",
    group: "",
    category: "",
    status: "active",
  });

  const setData = () => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };
  useEffect(() => {
    if (data) {
      setData();
    }
    setIsLoading(false);
  }, [data]);
  const [enabled, setEnabled] = useState(false);
  // const [showTooltip, setShowTooltip] = useState(false);

  if (isLoading) {
    return (
      <div className="font-semibold text-2xl text-center ">กำลังโหลด...</div>
    );
  }

  return (
    <Fieldset
      as="form"
      className={`space-y-6 rounded-xl ${className}`}
      onSubmit={(e) => onSubmit(e)}
    >
      <div className="flex items-center gap-3">
        <div className="font-semibold">แสดงช่องกรอกทั้งหมด</div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-black p-[2px_0px] ease-in-out focus:not-data-focus:outline-none data-checked:bg-green-600 data-focus:outline data-focus:outline-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0.5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-6.5"
          />
        </Switch>
      </div>
      {(formData?.name !== null || enabled) && (
        <TextBox
          name="name"
          title="ชื่อ"
          value={formData.name!!}
          onTextChange={(value) => setFormData({ ...formData, name: value })}
        />
      )}
      {/* {(formData?.code !== null || enabled) && (
        <TextBox
          name="code"
          title="code"
          value={formData.code!!}
          onTextChange={(value) => setFormData({ ...formData, code: value })}
        />
      )} */}
      {(formData?.link !== null || enabled) && (
        <TextBox
          name="link"
          title="ลิงค์"
          value={formData.link!!}
          onTextChange={(value) => setFormData({ ...formData, link: value })}
        />
      )}
      {(formData?.cover !== null || enabled) && (
        <Field>
          <Label className="text-xl font-semibold flex items-center gap-3">
            <span>ภาพพื้นหลัง</span>
            {/* <div
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative"
            >
              <Image src={circle_info} alt="icon" width={16} height={16} />
              {showTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-gray-700 text-white text-xs px-2 py-1 rounded w-50">
                  ขนาดที่แนะนำคือ 1280 x 500 พิกเซล
                </div>
              )}
            </div> */}
          </Label>
          <CoverUploadSection onCoverChange={() => {}} url={formData?.cover} />
        </Field>
      )}
      {(formData?.title !== null || enabled) && (
        <TextBox
          name="title"
          title="หัวข้อ"
          value={formData.title!!}
          onTextChange={(value) => setFormData({ ...formData, title: value })}
        />
      )}
      {(formData?.description !== null || enabled) && (
        <TextBox
          name="description"
          title="รายละเอียด"
          type="textarea"
          value={formData.description!!}
          onTextChange={(value) =>
            setFormData({ ...formData, description: value })
          }
        />
      )}
      {(formData?.content !== null || enabled) && (
        <TextEditor
          name="content"
          title="เนื้อหา"
          value={formData.content!!}
          onTextChange={(value) => setFormData({ ...formData, content: value })}
        />

        // <TextBox
        //   name="content"
        //   title="เนื้อหา"
        //   value={formData.content}
        //   onTextChange={(value) => setFormData({ ...formData, content: value })}
        // />
      )}
      {/* {(formData?.group !== null || enabled) && (
        <TextBox
          name="group"
          title="กลุ่ม"
          value={formData.group!!}
          onTextChange={(value) => setFormData({ ...formData, group: value })}
        />
      )}
      {(formData?.category !== null || enabled) && (
        <TextBox
          name="category"
          title="ประเภท"
          value={formData.category!!}
          onTextChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        />
      )} */}
      {(formData?.status !== null || enabled) && (
        <Field>
          <Label className="sm:text-lg text-base font-medium text-black">
            สถานะ
          </Label>
          <Listbox
            name="status"
            value={formData.status!!}
            onChange={(value) => setFormData({ ...formData, status: value })}
          >
            <ListboxButton
              className="flex justify-between items-center text-[#1E1E1E] font-normal w-full bg-white mt-3 rounded-lg border border-gray-400 px-3 py-2 text-sm/6
                    focus:not-data-focus:outline-none 
                    data-focus:outline-4 data-focus:outline-gray-600/25 data-focus:transition-all duration-20 ease-in-out"
            >
              <div>
                {formData.status == "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
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
      )}
      <div className="flex gap-3">
        <Button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
        >
          บันทึกรายการ
        </Button>
        <Button
          type="button"
          onClick={() => setData()}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
        >
          ยกเลิก
        </Button>
      </div>
    </Fieldset>
  );
}
