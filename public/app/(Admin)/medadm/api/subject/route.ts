import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();
    const search_params = request.nextUrl.searchParams

    const limit = search_params.get('limit') || 10;
    const search_text = search_params.get('search_text') || "";

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/subject?limit=${limit}&search_text=${search_text}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}

export async function POST(request: NextRequest) {
    const session = await auth();

    const formData = await request.formData();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/subject`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.user.token}` },
        body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}