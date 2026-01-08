import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products/stock/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user.token}`, "Content-Type": "application/json",
        },

    });
    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const formData = await request.json();
    const { id } = await params;
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products/stock/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user.token}`, "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: formData.id,
            before_stock: formData.before_stock,
            stock_change: formData.stock_change,
            remark: formData.description,
        }),
    });
    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
}
