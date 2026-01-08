import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/banner/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}

export async function PUT(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    const formData = await request.formData();

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/banner/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.user.token}` },
        body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const { id } = await params;

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/banner/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` }
    });    

    const data = await res.json();

    return NextResponse.json(data, { status: res.status })

}
