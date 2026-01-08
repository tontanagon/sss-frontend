import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();
    const params = request.nextUrl.searchParams

    const limit = params.get('limit') || 10;
    const page = params.get('page') || 1;
    const search_text = params.get('search_text') || "";
    const search_status = params.get('search_status') || "";
    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products?limit=${limit}&page=${page}&search_text=${search_text}&search_status=${search_status}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    });
    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
    });
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const session = await auth();
    
    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        },
        body: formData,
    });    
    
    const data = await res.json();

    return NextResponse.json(data, { status: 201 });
}
