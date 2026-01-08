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

export default function ModalEditStock({
  show,
  stock,
  onClose,
  onSubmit,
}: {
  show: boolean;
  stock: number;
  onClose: () => void;
  onSubmit: any;
}) {
  const [stockItem, setStockItem] = useState<any>(0);
  const [summaryStock, setSummaryStock] = useState<number>(Number(stock));
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    setSummaryStock(Number(stock) + Number(stockItem));
  }, [stockItem, stock]);

  useEffect(() => {
    setStockItem(0);
    setDescription("");
  }, [show]);

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
              เพิ่ม-ลด จำนวนวัสดุ - อุปกรณ์
              <button
                onClick={onClose}
                className="bg-[#FFFFFFCC] rounded-full px-[8px] text-[#0B9BB5] hover:outline-none hover:ring-2 hover:ring[#0B9BB5] cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="mt-1" />
              </button>
            </DialogTitle>

            <div className="bg-white flex justify-center text-center">
              <form autoComplete="off" onSubmit={onSubmit}>
                <Fieldset className="space-y-6 bg-white p-6 sm:p-10 gap-4 mx-auto">
                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      จำนวนวัสดุ-อุปกรณ์
                    </Label>
                    <div className="flex justify-around gap-5 items-center mt-3">
                      <Button
                        className="h-fit text-base cursor-pointer"
                        onClick={() =>
                          summaryStock > 0 && setStockItem(Number(stockItem) - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faCircleMinus} />
                      </Button>
                      <Input
                        className="sm:text-base text-sm text-[#1E1E1E] text-center font-normal bg-white rounded-[5px] border border-[#D9D9D9] w-[80px] p-2 focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                        type="number"
                        value={stockItem ?? ''}
                        name="stock"
                        onChange={(e) => setStockItem(e.currentTarget.value)}
                      />
                      <Button
                        className="h-fit text-base cursor-pointer"
                        onClick={() => setStockItem(Number(stockItem) + 1)}
                      >
                        <FontAwesomeIcon icon={faCirclePlus} />
                      </Button>
                    </div>
                  </Field>

                  <div>รวมทั้งหมด {summaryStock}</div>

                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      คำอธิบาย
                    </Label>
                    <Textarea
                      name="description"
                      className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field>
                </Fieldset>

                <div className="flex justify-end gap-3 mb-6 ml-[40px]">
                  <Button
                    type="submit"
                    className="mt-4 rounded bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-500 active:bg-sky-700 cursor-pointer"
                  >
                    บันทึกจำนวน
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
