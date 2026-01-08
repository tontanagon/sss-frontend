import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อรายการ"),
  code: z.string().min(1, "กรุณากรอกรหัสวัสดุ"),
  category: z.string().min(1, "กรุณาระบุหมวดหมู่"),
  type_id: z.string().min(1, "กรุณาระบุประเภท"),
  stock: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "จำนวนวัสดุ-อุปกรณ์ต้องมีมากกว่า 0",
    }),
  status: z.string().min(1, "กรุณาระบุสถานะ"),
});

export type CreateItemFormData = z.infer<typeof createItemSchema>;

export async function submitCreateItem(data: CreateItemFormData) {
  
  const parsed = createItemSchema.safeParse(data);
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

  const res = await fetch("/medadm/api/products", {
      method: "POST",
      body: formData,
    });

  return res.json();
}
