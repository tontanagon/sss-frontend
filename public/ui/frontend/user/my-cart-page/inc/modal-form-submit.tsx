"use client";

import {
  faCircleCheck,
  faCircleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import ModalCheck from "@/ui/layout/modal-check";
import { useCartStore } from "@/store/cartStore";
import { ApiResponse } from "@/Interfaces/response";
import { useRouter } from "nextjs-toploader/app";
import { submitBooking } from "@/actions/booking";
import { useSession } from "next-auth/react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
interface option {
  value: number;
  label: string;
  name: string;
}

const user = { name: "สมจิต คิดดี", std_code: "690010123", user_grade: "ปี2" };

export default function MyModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { cart_count, setCartCount, setCartCountList } = useCartStore();
  const { data: session, status } = useSession();
  const [subject, setSubject] = useState([
    { value: "", label: "ไม่มีข้อมูลกระบวนวิชา" },
  ]);

  const [teacherOption, setTeacherOption] = useState<
    { value: string; label: string }[]
  >([{ value: "ไม่มีอาจารในขณะนี้", label: "ไม่มีอาจารในขณะนี้" }]);

  useEffect(() => {
    const getTeacherOption = async () => {
      const res = await fetch("/api/cart/teacher-option");
      const data = await res.json();
      setTeacherOption(data.data);
    };

    const getSubject = async () => {
      const res = await fetch("/api/cart/subject-option");
      const data = await res.json();
      setSubject(data);
    };

    getSubject();
    getTeacherOption();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<ApiResponse>();
  const [error_message, setError] = useState("");
  const [style, setStyle] = useState("text-[#4CAF50]");
  const [title, setTitle] = useState("แก้ไขหมวดหมู่สำเร็จ");
  const [icon, setIcon] = useState(faCircleCheck);

  const [formData, setFormData] = useState<any>({
    user_name: session?.user.name,
    user_code: user.std_code,
    user_grade: user.user_grade,
    phone_number: "",
    return_at: "",
    subject: "",
    teacher: "",
    activity_name: "",
    participants: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      user_name: session?.user.name,
      // user_code: session?.user.user_code,
      // user_grade: session?.user.user_grade,
      teacher: session?.user.role.includes("Teacher") ? session?.user.name : "",
    });
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await submitBooking(formData);

    if (!data.status) {
      setError(data.message);
      setStyle("text-[#DD0000]");
      setTitle("บันทึกการจองไม่สำเร็จ");
      setIcon(faCircleXmark);
    } else {
      setError(data.message);
      setStyle("text-[#4CAF50]");
      setTitle("บันทึกการจองสำเร็จ");
      setIcon(faCircleCheck);
      setCartCount(0);
      setCartCountList(0);
    }
    setResponse(data);
    setShowModal(true);
  };

  return (
    <>
      <Button
        onClick={
          cart_count == 0 ? () => setIsOpen(true) : () => setIsOpen(true)
        }
        className="text-white sm:sm:text-base text-sm font-bold p-[10px_30px] rounded-[10px] bg-[#0B9BB5] hover:bg-cyan-700 cursor-pointer"
      >
        บันทึกการจอง
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-5xl shadow-xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <DialogTitle
                as="div"
                className="sm:text-xl text-lg flex justify-between items-center rounded-t-[8px] sm:p-[15px_40px] p-[15px_20px] bg-[#0055CA] mx-auto font-bold text-white"
              >
                ยืนยันการจอง
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#FFFFFFCC] rounded-full px-[8px] text-[#0B9BB5] hover:outline-none hover:ring-2 hover:ring[#0B9BB5] cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} className="mt-1" />
                </button>
              </DialogTitle>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 sm:p-10 grid grid-cols-2 gap-4"
              >
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    ชื่อ - สกุล
                  </Label>
                  <Input
                    defaultValue={formData.user_name}
                    disabled
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-[#FAFAFA] mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    รหัสนักศึกษา
                  </Label>
                  <Input
                    value={formData.user_code}
                    disabled
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-[#FAFAFA] mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    ชั้นปี
                  </Label>
                  <Input
                    disabled
                    value={formData.user_grade}
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-[#FAFAFA] mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    เบอร์โทร <span className="text-[#DD0000]">*</span>
                  </Label>
                  <Input
                    type="tel"
                    name="phone_number"
                    placeholder="เบอร์โทร"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    วันที่คืน <span className="text-[#DD0000]">*</span>
                  </Label>
                  <Input
                    name="return_at"
                    type="date"
                    value={formData.return_at}
                    onChange={(e) =>
                      setFormData({ ...formData, return_at: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    max={(() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 30);
                      return d.toISOString().split("T")[0];
                    })()}
                    placeholder="วว/ดด/ปปปป"
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                {subject.length > 0 && (
                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      กระบวนวิชา <span className="text-[#DD0000]">*</span>
                    </Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="กระบวนวิชา..."
                      isSearchable={true}
                      name="subject"
                      options={subject}
                      value={subject?.find(
                        (opt: any) => opt.value === formData.subject
                      )}
                      onChange={(selected) =>
                        setFormData({
                          ...formData,
                          subject: selected?.value || "",
                        })
                      }
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
                          backgroundColor: state.isFocused
                            ? "#F3F4F6"
                            : "#FFFFFF",
                          color: "#1E1E1E",
                          fontSize: "0.875rem",
                        }),
                      }}
                    />
                  </Field>
                )}

                {session?.user.role.includes("Teacher") ? (
                  <></>
                ) : teacherOption.length > 0 ? (
                  <Field>
                    <Label className="sm:text-lg text-base font-medium text-black">
                      อาจารย์ <span className="text-[#DD0000]">*</span>
                    </Label>
                    <Select
                      closeMenuOnSelect={true}
                      placeholder="อาจารย์"
                      isClearable={true}
                      options={teacherOption}
                      value={teacherOption?.find(
                        (opt: any) => opt.value === formData.teacher
                      )}
                      onChange={(selectedOption: any) => {
                        setFormData({
                          ...formData,
                          teacher: selectedOption ? selectedOption.value : "",
                        });
                      }}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#FFFFFF",
                          borderColor: state.isFocused ? "#A3A3A3" : "#D9D9D9",
                          borderWidth: "1px",
                          borderRadius: "0.375rem", // rounded-md
                          margin: "12px 0px 0px 0px",
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
                          backgroundColor: state.isFocused
                            ? "#F3F4F6"
                            : "#FFFFFF",
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
                            backgroundColor: "#A3A3A3",
                            color: "#FFFFFF",
                          },
                        }),
                      }}
                    />
                  </Field>
                ) : (
                  <></>
                )}
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    ชื่อกิจกรรม <span className="text-[#DD0000]">*</span>
                  </Label>
                  <Input
                    name="activity_name"
                    value={formData.activity_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activity_name: e.target.value,
                      })
                    }
                    placeholder="ชื่อกิจกรรม"
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>
                <Field>
                  <Label className="sm:text-lg text-base font-medium text-black">
                    จำนวนผู้เข้าร่วม <span className="text-[#DD0000]">*</span>
                  </Label>
                  <Input
                    name="participants"
                    value={formData.participants}
                    onChange={(e) =>
                      setFormData({ ...formData, participants: e.target.value })
                    }
                    placeholder="จำนวนผู้เข้าร่วม"
                    className="sm:text-base text-sm text-[#1E1E1E] font-normal block w-full bg-white mt-3 rounded-[5px] border border-[#D9D9D9] p-[14px_20px] focus:outline-none focus:ring-2 focus:ring-[#D9D9D9]"
                  />
                </Field>

                <input
                  type="hidden"
                  name="user_name"
                  value={formData?.user_name}
                />
                <input
                  type="hidden"
                  name="user_code"
                  value={formData?.user_code}
                />
                <input
                  type="hidden"
                  name="user_grade"
                  value={formData?.user_grade}
                />

                <Button
                  type="submit"
                  className="col-start-1 col-end-3 text-white sm:text-base text-sm font-bold p-[10px_30px] rounded-[10px] bg-[#0B9BB5] hover:bg-cyan-700 cursor-pointer"
                >
                  บันทึกการจอง
                </Button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ModalCheck
        show={showModal}
        status_style={style}
        icon={icon}
        header="บันทึกการจอง"
        onClose={
          !response?.status
            ? () => setShowModal(false)
            : () => router.push("/booking-history")
        }
        title={title}
        des={error_message}
      />
    </>
  );
}
