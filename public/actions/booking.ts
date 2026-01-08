import { z } from "zod";

const toStartOfDay = (dateStr: any) => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const bookingSchema = z.object({
  user_name: z.string().min(1, "กรุณากรอกชื่อ"),
  user_code: z.string().min(1, "กรุณากรอกรหัสนักศึกษา"),
  user_grade: z.string().min(1, "กรุณาระบุชั้นปี"),
  phone_number: z.string().trim().regex(/^0[0-9]{9}$/, "กรุณากรอกเบอร์โทรให้ถูกต้อง"),
  return_at: z
    .string()
    .min(1, "กรุณาระบุวันที่คืน"),
  subject: z.string().min(1, "กรุณาระบุกระบวนวิชา"),
  teacher: z.string().min(1, "กรุณาระบุชื่ออาจารย์"),
  activity_name: z.string().min(1, "กรุณาระบุชื่อกิจกรรม"),
  participants: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "จำนวนผู้เข้าร่วมต้องมีอย่างน้อย1คน",
    }),
}).refine((data) => {
  const start:any = toStartOfDay(new Date());
  const end:any = toStartOfDay(new Date(data.return_at)); 

  const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

  return diffInDays >= 0 && diffInDays <= 30;
}, {
  message: "ระยะเวลาการยืมต้องไม่เกิน 30 วันนับจากวันที่ทำรายการ",
  path: ["return_at"],
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export async function submitBooking(data: BookingFormData) {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: false,
      message: parsed.error.errors[0]?.message || "ข้อมูลไม่ถูกต้อง",
    };
  }

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch("/api/cart/save-booking", {
    method: "POST",
    body: formData,
  });

  return res.json();
}
