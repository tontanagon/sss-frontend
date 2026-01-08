import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchwrapper";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    const { id } = await params;

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        }
    });

    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const formData = await request.formData();
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        },
        body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const session = await auth();

    

    const res = await fetchWrapper(`${process.env.API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user.token}` },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
    });
}