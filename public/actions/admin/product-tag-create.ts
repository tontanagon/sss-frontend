import { z } from "zod";

export const createTypeSchema = z.object({
    name: z.string().min(1, "กรุณากรอกชื่อประเภท"),
    status: z.string().min(1, "กรุณาระบุสถานะ"),
});

export type CreateTypeFormData = z.infer<typeof createTypeSchema>;

export async function submitCreateTag(data: CreateTypeFormData) {

    const parsed = createTypeSchema.safeParse(data);
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

    const res = await fetch("/medadm/api/tags/create", {
        method: "POST",
        body: formData,
    });

    return res.json();
}
