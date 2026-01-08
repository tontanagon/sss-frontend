import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { formatDateToThai } from "@/lib/changeDateToThai";

export default function ModalExtendDate({
  show,
  date,
  onClose,
  onSubmit,
}: {
  show: boolean;
  date: string | undefined;
  onClose: () => void;
  onSubmit: any;
}) {
  const [dateExtend, setDateExtend] = useState<any>("");

  return (
    <Dialog open={show} as="div" className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <DialogTitle
              as="div"
              className="sm:text-xl text-lg flex justify-between items-center rounded-t-[8px] sm:p-[15px_40px] p-[15px_20px] bg-[#0055CA] mx-auto font-bold text-white"
            >
              เพิ่มวันการจอง
              <button
                onClick={onClose}
                className="bg-[#FFFFFFCC] rounded-full px-[8px] text-[#0B9BB5] hover:outline-none hover:ring-2 hover:ring[#0B9BB5] cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="mt-1" />
              </button>
            </DialogTitle>

            <div className="bg-white flex justify-">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(dateExtend);
                }}
                className="grow "
              >
                <Fieldset className="space-y-6 bg-white p-6 sm:p-10 gap-4 mx-auto">
                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      วันที่คืนเดิม
                    </Label>
                    <Input
                      className="sm:text-base text-sm text-[#1E1E1E] text-center font-normal block bg-white rounded-[5px] border border-[#D9D9D9] w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                      type="date"
                      value={date ? date.split(" ")[0] : ""}
                      disabled
                    />
                  </Field>

                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      วันที่คืนใหม่ <span className="text-[#DD0000] text-sm"> * สามารถเพิ่มได้สูงสุด 30 วัน</span>
                    </Label>
                    <Input
                      className="sm:text-base text-sm text-[#1E1E1E] text-center font-normal block bg-white rounded-[5px] border border-[#D9D9D9] w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                      type="date"
                      value={dateExtend}
                      name="date"
                      min={date ? date.split(" ")[0] : ""}
                      max={(() => {
                        if (!date) return "";
                        const d = new Date(date.split(" ")[0]);
                        d.setDate(d.getDate() + 30);
                        return d.toISOString().split("T")[0];
                      })()}
                      onChange={(e) => setDateExtend(e.target.value)}
                    />
                  </Field>
                </Fieldset>

                <div className="flex justify-end gap-3 mb-6 ml-[40px] mr-6">
                  <Button
                    type="submit"
                    className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
                  >
                    บันทึกรายการ
                  </Button>
                  <Button
                    onClick={onClose}
                    className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 active:bg-red-700 cursor-pointer"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
