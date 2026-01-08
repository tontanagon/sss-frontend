import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();
    const searchParams = new URL(request.url).searchParams;

        // Build query string safely
        const params = new URLSearchParams();
        if (searchParams.get("category")) params.append("category", searchParams.get("category")!);
        if (searchParams.get("teacher")) params.append("teacher", searchParams.get("teacher")!);
        if (searchParams.get("subject")) params.append("subject", searchParams.get("subject")!);
        if (searchParams.get("fromDate")) params.append("fromDate", searchParams.get("fromDate")!);
        if (searchParams.get("toDate")) params.append("toDate", searchParams.get("toDate")!);
        params.append("type", searchParams.get("type") || "excel");

        const res = await fetch(`${process.env.API_BASE_URL}/api/products/export/xlsx?${params.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user.token}`,
                },
            }
        );
    
    if (!res.ok) {
        return new NextResponse("Failed to download", { status: res.status });
    }
    const contentDisposition = res.headers.get("Content-Disposition");
    let filename = "products.xlsx";
    
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) {
            filename = match[1];
        }
    }
    
    const blob = await res.blob();
    return new NextResponse(blob, {
        status: 200,
        headers: {
            "Content-Type": res.headers.get("Content-Type") || "application/vnd.ms-excel",
            "Content-Disposition": `attachment; filename=${filename}`,
        },
    });
}
