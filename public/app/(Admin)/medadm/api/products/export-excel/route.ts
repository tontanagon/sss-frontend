import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();
    const searchParams = new URL(request.url).searchParams;

    const query = {
        category: searchParams.get("category"),
        teacher: searchParams.get("teacher"),
        subject: searchParams.get("subject"),
        fromDate: searchParams.get("fromDate"),
        toDate: searchParams.get("toDate"),
    };

    const res = await fetch(`${process.env.API_BASE_URL}/api/products/export/xlsx?category=${query.category}&teacher=${query.teacher}&subject=${query.subject}&fromDate=${query.fromDate}&toDate=${query.toDate}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
        },
    });
    
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
