import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ModalConfirm({
  show,
  header,
  description,
  onClose,
  onConfirm,
  style_button = "bg-red-500 text-white",
}: {
  show: boolean;
  header: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  style_button?: string;
}) {
  return (
    <Dialog open={show} as="div" className="relative z-50" onClose={onClose}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

      {/* Container */}
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-lg bg-white shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            {/* Header */}
            <DialogTitle
              as="div"
              className="flex justify-between items-center rounded-t-lg bg-[#0055CA] px-6 py-4 font-bold text-white text-lg sm:text-xl"
            >
              {header}
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 bg-white/80 rounded-full text-[#0B9BB5] hover:ring-2 hover:ring-[#0B9BB5] transition cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </DialogTitle>

            {/* Body */}
            <div className="flex flex-col items-center gap-4 p-6 text-center">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-[100px] text-[#FCB500]"
              />

              <div className="text-[#0C4A7D] text-2xl sm:text-3xl font-bold">
                {description}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-3 w-full px-4 sm:px-0">
                <button
                  type="button"
                  className={`px-4 py-2 rounded cursor-pointer ${style_button} hover:opacity-90 transition`}
                  onClick={onConfirm}
                >
                  ยืนยัน
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border bg-gray-400 text-white rounded cursor-pointer hover:bg-gray-500 transition"
                  onClick={onClose}
                >
                  กลับ
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
