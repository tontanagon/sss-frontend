import { z } from "zod";

export const UpdateItemStockSchema = z.object({
  id: z.number(),
  before_stock: z.number(),
  after_stock: z.number().min(0, {
    message: "จำนวนวัสดุ-อุปกรณ์ต้องมีมากกว่า 0",
  }),
  stock_change:z.number(),
  description: z.string().nullable().optional(),
});

export type UpdateItemStockFormData = z.infer<typeof UpdateItemStockSchema>;

export async function submitUpdateStockItem(data: UpdateItemStockFormData) {
  const parsed = UpdateItemStockSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: false,
      message: parsed.error.errors[0]?.message || "ข้อมูลไม่ถูกต้อง",
    };
  }
  
  
  const res = await fetch(`/medadm/api/products/stock/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data.id,
      before_stock: data.before_stock,
      stock_change: data.stock_change,
      description: data.description,
    }),
  });

  return res.json();
}
