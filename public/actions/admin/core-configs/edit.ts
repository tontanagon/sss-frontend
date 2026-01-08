import { z } from "zod";

export const editCoreConfigsSchema = z.object({
    name: z.string().nullable().optional(),
    // code: z.string().min(1, "กรุณากรอกcode"),
    link: z.string().nullable().optional(),
    cover: z.instanceof(File).nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    // group: z.string().nullable().optional(),
    // category: z.string().nullable().optional(),
    status: z.string().min(1, "กรุณาระบุสถานะ"),
});

export type EditCoreConfigsFormData = z.infer<typeof editCoreConfigsSchema>;

export async function submitEditCoreConfigs(data: EditCoreConfigsFormData,code:string) {

    const parsed = editCoreConfigsSchema.safeParse(data);
    if (!parsed.success) {
        console.log(parsed.error.errors[0]);
        
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
        } 
        else {
            formData.append(key, String(value));
        }
    });

    const res = await fetch(`/medadm/api/core-configs/${code}`, {
        method: "PUT",
        body: formData,
    });

    return res.json();
}
