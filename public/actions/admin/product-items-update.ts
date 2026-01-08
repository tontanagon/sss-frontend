import { z } from "zod";

export const UpdateItemSchema = z.object({
  id: z.any().nullable(),
  name: z.string().min(1, "กรุณากรอกชื่อรายการ"),
  code: z.string().min(1, "กรุณากรอกรหัสวัสดุ"),
  category: z.string().min(1, "กรุณาระบุหมวดหมู่"),
  type_id: z.string().min(1, "กรุณาระบุประเภท"),
  status: z.string().min(1, "กรุณาระบุสถานะ"),
});

export type UpdateItemFormData = z.infer<typeof UpdateItemSchema>;

export async function submitUpdateItem(data: UpdateItemFormData) {

  const parsed = UpdateItemSchema.safeParse(data);
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

  const res = await fetch(`/medadm/api/products/${data.id}`, {
      method: "PUT",
      body: formData,
    });

  return res.json();
}
