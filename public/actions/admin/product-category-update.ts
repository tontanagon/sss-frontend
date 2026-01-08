import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1, "กรุณากรอกชื่อหมวดหมู่"),
    image: z.instanceof(File).nullable(),
    image_old_path: z.string().nullable(),
    status: z.string().min(1, "กรุณาระบุสถานะ"),
    description: z.string().nullable(),
});

export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;

export async function submitUpdateCategory(data: UpdateCategoryFormData) {

    const parsed = updateCategorySchema.safeParse(data);
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

    const res = await fetch("/medadm/api/categories/update", {
        method: "POST",
        body: formData,
    });

    return res.json();
}
