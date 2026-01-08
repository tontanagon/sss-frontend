import { CoreConfigsForm } from "@/Interfaces/core-configs";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Switch,
  Textarea,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import CoverUploadSection from "../../form/cover";

export default function FormBanner({
  data,
  onSubmit,
}: {
  data?: CoreConfigsForm;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [formData, setFormData] = useState<any>({
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

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <Fieldset
      as="form"
      className="space-y-6 rounded-xl basis-3/4"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Field>
        <Label className="text-xl font-semibold">ชื่อ</Label>
        <Input
          name="name"
          value={formData.name || ""}
          onChange={(e) =>
            setFormData({ ...formData, name: e.currentTarget.value })
          }
          className="mt-3 block w-full
              border border-gray-400 rounded-lg
              px-3 py-2 text-sm/6
              focus:not-data-focus:outline-none 
              data-focus:outline-4  data-focus:outline-gray-600/25 data-focus:transition-all duration-20 ease-in-out"
        />
      </Field>
      <Field>
        <Label className="text-xl font-semibold">หัวข้อ</Label>
        <Input
          name="title"
          value={formData.title || ""}
          onChange={(e) =>
            setFormData({ ...formData, title: e.currentTarget.value })
          }
          className="mt-3 block w-full
              border border-gray-400 rounded-lg
              px-3 py-2 text-sm/6
              focus:not-data-focus:outline-none 
              data-focus:outline-4  data-focus:outline-gray-600/25 data-focus:transition-all duration-20 ease-in-out"
        />
      </Field>

      <Field>
        <Label className="text-xl font-semibold">รายละเอียด</Label>
        <Input
          name="description"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.currentTarget.value })
          }
          className="mt-3 block w-full
              border border-gray-400 rounded-lg
              px-3 py-2 text-sm/6
              focus:not-data-focus:outline-none 
              data-focus:outline-4  data-focus:outline-gray-600/25 data-focus:transition-all duration-20 ease-in-out"
        />
      </Field>

      <Field>
        <Label className="text-xl font-semibold flex items-center gap-3">
          <span>ภาพพื้นหลัง</span>
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md font-medium">
            ขนาดที่แนะนำ: 1280 x 500 px
          </span>
        </Label>
        <CoverUploadSection onCoverChange={() => {}} url={formData?.cover} />
      </Field>

      <div className="flex items-center gap-3">
        <div className="font-semibold">แสดง Banner</div>
        <input type="hidden" name="status" value={formData.status} />
        <Switch
          checked={formData.status === "active"}
          onChange={(checked) =>
            setFormData({
              ...formData,
              status: checked ? "active" : "inactive",
            })
          }
          className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-gray-300 p-[2px_0px] ease-in-out focus:not-data-focus:outline-none data-checked:bg-green-600 data-focus:outline data-focus:outline-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0.5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-6.5"
          />
        </Switch>
      </div>

      <div className="flex gap-3 mb-6">
        <Button
          type="submit"
          className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
        >
          บันทึกรายการ
        </Button>
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
        >
          ยกเลิก
        </Button>
      </div>
    </Fieldset>
  );
}
