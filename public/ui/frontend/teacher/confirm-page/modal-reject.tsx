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
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ModalReject({
  show,
  onClose,
  onSubmit,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: any;
}) {
  const [remark, setRemark] = useState("");
  return (
    <Dialog open={show} as="div" className="relative z-10" onClose={onClose}>
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <DialogTitle
              as="div"
              className="sm:text-xl text-lg flex justify-between items-center rounded-t-[8px] sm:p-[15px_40px] p-[15px_20px] bg-[#0055CA] mx-auto font-bold text-white"
            >
              ยกเลิกการจอง
              <button
                onClick={onClose}
                className="bg-[#FFFFFFCC] rounded-full px-[8px] text-[#0B9BB5] hover:outline-none hover:ring-2 hover:ring[#0B9BB5] cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="mt-1" />
              </button>
            </DialogTitle>

            <div className="bg-white text-start p-[20px_40px]">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(remark);
                }}
              >
                <Fieldset className="space-y-6 bg-white p-5 sm:p-5 gap-4 mx-auto">
                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      คำอธิบาย
                    </Label>
                    <Textarea
                      name="description"
                      className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </Field>
                </Fieldset>

                <div className="flex justify-end gap-3 mb-6 ml-[40px]">
                  <Button
                    type="submit"
                    className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 active:bg-red-500 cursor-pointer"
                  >
                    ยืนยันยกเลิก
                  </Button>
                  <Button
                    onClick={onClose}
                    className="mt-4 rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600 active:bg-gray-400 cursor-pointer"
                  >
                    ปิด
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
