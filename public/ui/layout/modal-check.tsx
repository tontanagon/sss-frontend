import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function ModalCheck({
  show,
  status_style,
  icon,
  header,
  title,
  des,
  onClose
}: {
  show: boolean;
  status_style: string;
  icon: any;
  header: string;
  title: string;
  des: string;
  onClose: () => void;
}) {
  return (
    <Dialog
        open={show}
        as="div"
        className="relative z-100"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <DialogTitle
                as="div"
                className="sm:text-xl text-lg flex justify-between items-center rounded-t-[8px] sm:p-[15px_40px] p-[15px_20px] bg-[#0055CA] mx-auto font-bold text-white"
              >
                {header}
                <button
                  onClick={onClose}
                  className="bg-[#FFFFFFCC] rounded-full px-[8px] text-[#0B9BB5] hover:outline-none hover:ring-2 hover:ring[#0B9BB5] cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} className="mt-1" />
                </button>
              </DialogTitle>
              <div className="bg-white flex flex-col gap-4 justify-center text-center px-20">
                <FontAwesomeIcon icon={icon} className={`text-[100px] mt-5 ${status_style}`}  />
                <div className="text-[#0C4A7D] text-[32px] font-bold">{title}</div>
                <div className="text-xl font-normal">{des}</div>
                <div onClick={onClose} className="text-[#969696] text-base font-normal mb-7 cursor-pointer underline ">ปิดหน้าต่างนี้</div>
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
  );
}
