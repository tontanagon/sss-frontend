import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "กรุณากรอกชื่อหมวดหมู่"),
    image: z.instanceof(File).nullable(),
    image_old_path: z.string().nullable(),
    status: z.string().min(1, "กรุณาระบุสถานะ"),
    description: z.string().nullable(),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export async function submitCreateCategory(data: CreateCategoryFormData) {

    const parsed = createCategorySchema.safeParse(data);
    if (!parsed.success) {
        return {
            status: false,
            message: parsed.error.errors[0]?.message || "ข้อมูลไม่ถูกต้อง",
        };
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof File) {
            formData.append(key, value);
        } else {
            formData.append(key, String(value));
        }
    });

    const res = await fetch("/medadm/api/categories/create", {
        method: "POST",
        body: formData,
    });

    return res.json();
}
