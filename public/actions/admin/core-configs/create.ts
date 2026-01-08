import { z } from "zod";

export const createCoreConfigsSchema = z.object({
    name: z.string().nullable(),
    code: z.string().min(1, "กรุณากรอกcode"),
    link: z.string().nullable(),
    cover: z.instanceof(File).nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    content: z.string().nullable(),
    group: z.string().nullable(),
    category: z.string().nullable(),
    status: z.string().min(1, "กรุณาระบุสถานะ"),
});

export type CreateCoreConfigsFormData = z.infer<typeof createCoreConfigsSchema>;

export async function submitCreateCoreConfigs(data: CreateCoreConfigsFormData) {

    const parsed = createCoreConfigsSchema.safeParse(data);
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

    const res = await fetch("/medadm/api/core-configs", {
        method: "POST",
        body: formData,
    });

    return res.json();
}
